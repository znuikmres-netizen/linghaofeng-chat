"use client";

import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";

interface DialogueBoxProps {
  characterName: string;
  characterEmoji: string;
  dialogue: string;
  onComplete: () => void;
  isComplete: boolean;
}

export default function DialogueBox({
  characterName,
  characterEmoji,
  dialogue,
  onComplete,
  isComplete,
}: DialogueBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-md border border-cyan-400/30 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-cyan-500/10"
    >
      {/* Speaker label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{characterEmoji}</span>
        <span className="text-cyan-300 font-bold text-sm sm:text-base glow-cyan">
          {characterName}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/50 to-transparent" />
      </div>

      {/* Dialogue text */}
      <div className="min-h-[60px] sm:min-h-[70px]">
        <TypewriterText
          text={dialogue}
          speed={35}
          className="text-white text-base sm:text-lg leading-relaxed font-medium"
          onComplete={onComplete}
          skipAnimation={isComplete}
        />
      </div>

      {!isComplete && (
        <p className="text-white/30 text-xs mt-2 text-right animate-pulse">
          點擊跳過 ▶
        </p>
      )}
    </motion.div>
  );
}
