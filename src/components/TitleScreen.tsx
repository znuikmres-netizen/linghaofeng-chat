"use client";

import { motion } from "framer-motion";
import { useSound } from "@/hooks/useSound";

interface TitleScreenProps {
  onStart: () => void;
  onContinue?: () => void;
  hasSave: boolean;
}

export default function TitleScreen({ onStart, onContinue, hasSave }: TitleScreenProps) {
  const { play } = useSound();

  const handleStart = () => {
    play("click");
    onStart();
  };

  const handleContinue = () => {
    play("click");
    onContinue?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-30 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950"
    >
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[200, 340, 480].map((size, i) => (
          <motion.div
            key={size}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
            style={{ width: size, height: size }}
            className="absolute border border-white/5 rounded-full"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-sm w-full">
        {/* Rocket */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl sm:text-8xl mb-4"
        >
          🚀
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-2 glow-cyan"
          style={{ fontFamily: "Fredoka One, cursive" }}
        >
          小小太空隊長
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-cyan-300 text-lg mb-8 glow-cyan"
        >
          Space Captain Adventure
        </motion.p>

        {/* Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8 text-white/80 text-sm leading-relaxed"
        >
          🌟 收集星星  ⚡ 管理能源  🏅 獲得徽章
          <br />
          你的選擇將決定宇宙的命運！
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-2xl text-xl shadow-lg shadow-cyan-500/40 transition-all animate-pulse-glow"
          >
            🚀 開始冒險！
          </motion.button>

          {hasSave && onContinue && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleContinue}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-3 rounded-2xl text-base transition-all"
            >
              📂 繼續遊戲
            </motion.button>
          )}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-white/20 text-xs mt-8"
        >
          適合 6 歲以上的太空冒險！
        </motion.p>
      </div>
    </motion.div>
  );
}
