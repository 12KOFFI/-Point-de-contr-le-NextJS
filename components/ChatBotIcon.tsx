"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX } from "react-icons/fi";
import ChatPanel from "./ChatPanel";

export default function ChatBotIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Floating icon button */}
      <div className="fixed bottom-6 right-4 z-[60] sm:right-6">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.button
              key="open"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsOpen(true)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 shadow-[0_8px_32px_rgba(59,130,246,0.4)] transition-shadow hover:shadow-[0_8px_40px_rgba(59,130,246,0.55)]"
              aria-label="Open chat"
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/25" />
              <FiMessageCircle className="relative z-10 h-6 w-6 text-white" />
            </motion.button>
          ) : (
            <motion.button
              key="close"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setIsOpen(false)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 shadow-lg dark:bg-white"
              aria-label="Close chat"
            >
              <FiX className="h-6 w-6 text-white dark:text-slate-900" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
