"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FiMessageCircle, FiX } from "react-icons/fi";

// The assistant panel is loaded only when needed,
// so it stays out of the initial bundle of every page.
const loadChatPanel = () => import("./ChatPanel");
const ChatPanel = dynamic(loadChatPanel, { ssr: false });

export default function ChatBotIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const toggle = () => {
    setHasOpened(true);
    setIsOpen((open) => !open);
  };

  return (
    <>
      {hasOpened && (
        <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}

      {/* Floating icon button */}
      <div className="fixed bottom-6 right-4 z-[60] sm:right-6">
        <button
          type="button"
          onClick={toggle}
          // Prefetch the panel chunk as soon as the user shows intent
          onPointerEnter={loadChatPanel}
          onFocus={loadChatPanel}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          aria-expanded={isOpen}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full transition-[background-color,box-shadow,scale] duration-300 hover:scale-[1.08] active:scale-[0.92] ${
            isOpen
              ? "bg-slate-900 shadow-lg dark:bg-white"
              : "bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 shadow-[0_8px_32px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.55)]"
          }`}
        >
          {/* Pulse ring */}
          {!isOpen && (
            <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/25 motion-reduce:hidden" />
          )}
          <FiMessageCircle
            className={`absolute h-6 w-6 text-white transition-[opacity,rotate,scale] duration-300 ${
              isOpen ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <FiX
            className={`absolute h-6 w-6 text-white transition-[opacity,rotate,scale] duration-300 dark:text-slate-900 ${
              isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-0 opacity-0"
            }`}
          />
        </button>
      </div>
    </>
  );
}
