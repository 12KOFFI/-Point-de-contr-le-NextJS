"use client";

import React, { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiDownload, FiRotateCcw, FiSend, FiX } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import {
  answer,
  topicReply,
  welcome,
  TOPIC_ORDER,
  UI,
  type Action,
  type Reply,
  type TopicId,
} from "@/lib/assistant";

type Message =
  | { id: number; from: "bot"; reply: Reply }
  | { id: number; from: "user"; text: string };

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

let nextId = 1;

function ActionLink({ action }: { action: Action }) {
  const internal = action.href.startsWith("/") && !action.download;
  return (
    <a
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noopener noreferrer" : undefined}
      download={action.download || undefined}
      className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      {action.label}
      {action.download ? (
        <FiDownload aria-hidden="true" className="h-3.5 w-3.5" />
      ) : !internal ? (
        <FiArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
      ) : null}
    </a>
  );
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const { lang } = useLanguage();
  const ui = UI[lang];
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: nextId++, from: "bot", reply: welcome(lang) },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // keep the latest exchange in view
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  // focus the input on open, Escape closes
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 150);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  // language switch: restart in the new language
  useEffect(() => {
    clearTimeout(timer.current);
    setTyping(false);
    setMessages([{ id: nextId++, from: "bot", reply: welcome(lang) }]);
  }, [lang]);

  useEffect(() => () => clearTimeout(timer.current), []);

  // a short "typing" beat makes the exchange readable; skipped with reduced motion
  const respond = (userText: string, reply: Reply) => {
    clearTimeout(timer.current);
    setMessages((m) => [...m, { id: nextId++, from: "user", text: userText }]);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduce ? 0 : Math.min(900, 350 + reply.text.length * 2);
    setTyping(true);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId++, from: "bot", reply }]);
    }, delay);
  };

  const askTopic = (topic: TopicId) => respond(ui.topics[topic], topicReply(topic, lang));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    respond(text, answer(text, lang));
  };

  const restart = () => {
    clearTimeout(timer.current);
    setTyping(false);
    setMessages([{ id: nextId++, from: "bot", reply: welcome(lang) }]);
  };

  const last = messages[messages.length - 1];
  const suggestions = !typing && last?.from === "bot" ? (last.reply.next ?? TOPIC_ORDER) : [];

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={ui.title}
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`fixed bottom-24 right-4 z-[60] w-[calc(100vw-2rem)] max-w-md origin-bottom-right transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none sm:right-6 ${
        isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"
      }`}
    >
      <div className="flex h-[min(72vh,600px)] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.25)] dark:border-white/10 dark:bg-slate-950">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 text-sm font-black text-white">
              IK
            </div>
            <div>
              <p className="text-sm font-bold text-white">{ui.title}</p>
              <p className="text-[11px] text-white/80">{ui.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={restart}
              aria-label={ui.restart}
              title={ui.restart}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <FiRotateCcw size={17} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={ui.close}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          aria-live="polite"
          className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-4 py-4"
        >
          {messages.map((m) =>
            m.from === "user" ? (
              <div key={m.id} className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-md bg-slate-900 px-4 py-2.5 text-sm text-white dark:bg-white dark:text-slate-900">
                  {m.text}
                </p>
              </div>
            ) : (
              <div key={m.id} className="flex flex-col items-start gap-2">
                <div className="max-w-[88%] whitespace-pre-line rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-100">
                  {m.reply.text}
                </div>
                {m.reply.actions?.length ? (
                  <div className="flex max-w-[88%] flex-wrap gap-2">
                    {m.reply.actions.map((a) => (
                      <ActionLink key={a.label + a.href} action={a} />
                    ))}
                  </div>
                ) : null}
              </div>
            ),
          )}

          {typing && (
            <div className="flex items-center gap-2" aria-label={ui.typing}>
              <div className="flex gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {/* Suggested next topics */}
        {suggestions.length > 0 && (
          <div className="border-t border-slate-200 px-4 pt-3 dark:border-white/10">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {ui.topicsLabel}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              {suggestions.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => askTopic(topic)}
                  className="shrink-0 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-300 pointer-coarse:py-2.5"
                >
                  {ui.topics[topic]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Free question */}
        <div className="px-4 pb-3 pt-3">
          <form onSubmit={submit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={ui.placeholder}
              aria-label={ui.placeholder}
              maxLength={300}
              className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/15 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label={ui.send}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <FiSend size={17} />
            </button>
          </form>
          <p className="mt-2 text-center text-[10px] text-slate-500 dark:text-slate-400">{ui.note}</p>
        </div>
      </div>
    </div>
  );
}
