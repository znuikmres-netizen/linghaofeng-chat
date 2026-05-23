"use client";

import { motion } from "framer-motion";

interface CharacterAreaProps {
  characterName: string;
  characterEmoji: string;
  dialogue: string;
  narration: string;
  onDialogueComplete?: () => void;
  showChoices: boolean;
}

export default function CharacterArea({
  characterName,
  characterEmoji,
  narration,
}: CharacterAreaProps) {
  return (
    <div className="flex items-end gap-3 sm:gap-4">
      {/* Character Avatar */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="shrink-0"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 border-3 border-cyan-400/60 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-4xl sm:text-5xl">
          {characterEmoji}
        </div>
        <p className="text-center text-white/70 text-xs mt-1 max-w-[64px] sm:max-w-[80px] truncate">
          {/* character name shown below avatar */}
        </p>
      </motion.div>

      {/* Narration Bubble */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 relative"
      >
        <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-2xl rounded-bl-none px-4 py-3 shadow-xl">
          <p className="text-white/60 text-xs mb-1 font-semibold">{characterEmoji} 旁白</p>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed font-medium">
            {narration}
          </p>
        </div>
        {/* Bubble tail */}
        <div className="absolute bottom-0 left-[-8px] w-0 h-0 border-r-[10px] border-r-black/50 border-t-[10px] border-t-transparent" />
      </motion.div>
    </div>
  );
}
