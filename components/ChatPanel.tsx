"use client";

import React, { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { FiSend, FiX, FiMessageCircle } from "react-icons/fi";

const suggestionsMap = {
  fr: [
    "Parle-moi de ton expérience",
    "Quels projets as-tu réalisés ?",
    "Quelles technologies maîtrises-tu ?",
    "As-tu déjà travaillé en remote ?",
  ],
  en: [
    "Tell me about your experience",
    "What projects have you built?",
    "What technologies do you master?",
    "Have you worked remotely before?",
  ],
};

const uiText = {
  fr: {
    title: "Isaac – Assistant IA",
    subtitle: "Posez vos questions sur mon profil",
    placeholder: "Écrivez votre message…",
    typing: "En train d'écrire…",
    greeting:
      "Bonjour ! 👋 Je suis l'assistant IA d'Isaac. Posez-moi vos questions sur son profil, ses projets ou ses compétences.",
    suggestionsLabel: "Suggestions :",
    poweredBy: "Propulsé par IA · Données du portfolio",
  },
  en: {
    title: "Isaac – AI Assistant",
    subtitle: "Ask me anything about my profile",
    placeholder: "Type your message…",
    typing: "Typing…",
    greeting:
      "Hello! 👋 I'm Isaac's AI assistant. Ask me about his profile, projects or skills.",
    suggestionsLabel: "Suggestions:",
    poweredBy: "AI-powered · Portfolio data",
  },
};

/** Extract text content from UIMessage parts */
function getMessageText(msg: {
  parts: Array<{ type: string; text?: string }>;
}): string {
  return msg.parts
    .filter((p) => p.type === "text" && p.text)
    .map((p) => p.text)
    .join("");
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const { lang } = useLanguage();
  const ui = uiText[lang];
  const suggestions = suggestionsMap[lang];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { lang },
    }),
    messages: [
      {
        id: "greeting",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: ui.greeting }],
      },
    ],
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim() || isLoading) return;
    setInput("");
    sendMessage({ text });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const showSuggestions = messages.length <= 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-24 right-4 z-[60] w-[calc(100vw-2rem)] max-w-md sm:right-6"
        >
          <div className="flex h-[min(70vh,580px)] flex-col overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/92 shadow-[0_30px_80px_rgba(15,23,42,0.22)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <FiMessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{ui.title}</p>
                  <p className="text-[11px] text-white/70">{ui.subtitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={
                        msg.role === "user"
                          ? "max-w-[80%] rounded-2xl rounded-br-md bg-slate-900 px-4 py-3 text-sm leading-relaxed text-white dark:bg-white dark:text-slate-900"
                          : "max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                      }
                    >
                      <div className="whitespace-pre-wrap">
                        {getMessageText(msg)}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:0ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:300ms]" />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {ui.typing}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Error indicator */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                      {lang === "fr"
                        ? "Désolé, une erreur est survenue. Veuillez réessayer."
                        : "Sorry, an error occurred. Please try again."}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4"
                >
                  <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {ui.suggestionsLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSend(s)}
                        className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-blue-400/30 dark:hover:text-blue-300"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-slate-200/80 bg-white/70 px-4 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <form
                onSubmit={handleFormSubmit}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={ui.placeholder}
                  className="flex-1 rounded-full border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-all hover:bg-blue-600 disabled:opacity-40 dark:bg-white dark:text-slate-900 dark:hover:bg-blue-100"
                  aria-label="Send"
                >
                  <FiSend size={18} />
                </button>
              </form>
              <p className="mt-2 text-center text-[10px] text-slate-400 dark:text-slate-500">
                {ui.poweredBy}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
