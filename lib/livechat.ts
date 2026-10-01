/**
 * Live chat (Tawk.to) bridge.
 *
 * Tawk's own floating bubble is kept hidden: the site's assistant button stays the
 * single entry point, and the assistant offers "talk to Isaac live" from inside.
 * This module exposes Tawk's state (online status, unread replies) to React and a
 * way to open the chat window.
 */
import { useSyncExternalStore } from "react";

export const TAWK_SRC = "https://embed.tawk.to/6abeebc9e4b7de3446fe1e57/1k3ssi3jq";

export type LiveStatus = "loading" | "online" | "away" | "offline";
export type LiveState = { status: LiveStatus; unread: number; open: boolean };

type TawkApi = {
  onLoad?: () => void;
  onStatusChange?: (status: string) => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  onChatHidden?: () => void;
  onChatMessageAgent?: () => void;
  getStatus?: () => string;
  showWidget?: () => void;
  hideWidget?: () => void;
  maximize?: () => void;
  minimize?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

let state: LiveState = { status: "loading", unread: 0, open: false };
let loaded = false;
let pendingOpen = false;
const listeners = new Set<(s: LiveState) => void>();

const set = (patch: Partial<LiveState>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l(state));
};

const toStatus = (s?: string): LiveStatus =>
  s === "online" || s === "away" || s === "offline" ? s : "offline";

export const getLiveState = () => state;

export function subscribeLive(listener: (s: LiveState) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Opens the Tawk chat window (or queues it until the script has loaded). */
export function openLiveChat() {
  const api = window.Tawk_API;
  if (!loaded || !api?.maximize) {
    pendingOpen = true;
    return;
  }
  api.showWidget?.();
  api.maximize();
  set({ unread: 0, open: true });
}

/** Wires Tawk callbacks; must run before the embed script executes. */
export function setupTawkApi() {
  const api: TawkApi = (window.Tawk_API = window.Tawk_API || {});
  window.Tawk_LoadStart = new Date();

  api.onLoad = () => {
    loaded = true;
    api.hideWidget?.(); // no second floating bubble
    set({ status: toStatus(api.getStatus?.()) });
    if (pendingOpen) {
      pendingOpen = false;
      openLiveChat();
    }
  };
  api.onStatusChange = (s) => set({ status: toStatus(s) });
  api.onChatMaximized = () => set({ open: true, unread: 0 });
  const close = () => {
    api.hideWidget?.();
    set({ open: false });
  };
  api.onChatMinimized = close;
  api.onChatHidden = () => set({ open: false });
  // Isaac answered while the window is closed → badge on the site's button
  api.onChatMessageAgent = () => {
    if (!state.open) set({ unread: state.unread + 1 });
  };
}

/** React hook: current live-chat state (status, unread, open). */
const SERVER_STATE: LiveState = { status: "loading", unread: 0, open: false };
export function useLiveChat(): LiveState {
  return useSyncExternalStore(subscribeLive, getLiveState, () => SERVER_STATE);
}
