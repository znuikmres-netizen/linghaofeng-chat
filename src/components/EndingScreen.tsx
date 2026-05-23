"use client";

import { motion } from "framer-motion";
import { GameState, ALL_BADGES } from "@/types/game";
import { useSound } from "@/hooks/useSound";
import { useEffect } from "react";

interface EndingScreenProps {
  state: GameState;
  endingType: "hero" | "peace" | "explorer" | "game_over";
  title: string;
  dialogue: string;
  characterEmoji: string;
  onRestart: () => void;
}

const ENDING_CONFIG = {
  hero: {
    emoji: "🦸",
    title: "英雄隊長",
    color: "from-yellow-900 via-orange-900 to-red-900",
    border: "border-yellow-400",
    glow: "shadow-yellow-500/40",
    message: "你用勇氣拯救了整個宇宙！",
    stars: "⭐⭐⭐⭐⭐",
  },
  peace: {
    emoji: "🕊️",
    title: "和平使者",
    color: "from-pink-900 via-purple-900 to-violet-900",
    border: "border-pink-400",
    glow: "shadow-pink-500/40",
    message: "你用愛與友善化解了所有危機！",
    stars: "⭐⭐⭐⭐⭐",
  },
  explorer: {
    emoji: "🌌",
    title: "宇宙探險家",
    color: "from-cyan-900 via-teal-900 to-emerald-900",
    border: "border-cyan-400",
    glow: "shadow-cyan-500/40",
    message: "你探索了宇宙中最神秘的角落！",
    stars: "⭐⭐⭐⭐",
  },
  game_over: {
    emoji: "💫",
    title: "需要再試一次",
    color: "from-gray-900 via-slate-900 to-zinc-900",
    border: "border-gray-400",
    glow: "shadow-gray-500/40",
    message: "沒關係，英雄都要從失敗中學習！",
    stars: "⭐⭐",
  },
};

const Firework = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ y: "100%", opacity: 1 }}
    animate={{ y: "-100%", opacity: [1, 1, 0] }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: Math.random() * 3 }}
    style={{ left: `${10 + Math.random() * 80}%` }}
    className="absolute bottom-0 text-2xl pointer-events-none"
  >
    {["🎆", "🎇", "✨", "🌟", "💥"][Math.floor(Math.random() * 5)]}
  </motion.div>
);

export default function EndingScreen({
  state,
  endingType,
  title,
  dialogue,
  characterEmoji,
  onRestart,
}: EndingScreenProps) {
  const { play } = useSound();
  const config = ENDING_CONFIG[endingType];

  useEffect(() => {
    play("victory");
  }, [play]);

  const rank =
    state.stars >= 80
      ? "S 傳奇"
      : state.stars >= 60
      ? "A 優秀"
      : state.stars >= 40
      ? "B 良好"
      : "C 繼續努力";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-50 bg-gradient-to-br ${config.color} flex flex-col items-center justify-center p-4 overflow-auto`}
    >
      {/* Fireworks */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <Firework key={i} delay={i * 0.4} />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15, delay: 0.3 }}
        className={`relative z-10 max-w-md w-full bg-black/40 backdrop-blur-md border-2 ${config.border} ${config.glow} shadow-2xl rounded-3xl p-6 sm:p-8 text-center`}
      >
        {/* Big emoji */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl sm:text-8xl mb-4"
        >
          {config.emoji}
        </motion.div>

        {/* Ending title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: "Fredoka One, cursive" }}>
          {title}
        </h1>
        <p className="text-white/70 text-base mb-4">{config.message}</p>

        {/* Stars display */}
        <div className="text-2xl mb-4">{config.stars}</div>

        {/* Dialogue */}
        <div className="bg-black/30 rounded-2xl px-4 py-3 mb-5">
          <p className="text-3xl mb-2">{characterEmoji}</p>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed">{dialogue}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-yellow-500/20 rounded-xl p-3">
            <div className="text-2xl">⭐</div>
            <div className="text-yellow-300 font-bold text-lg">{state.stars}</div>
            <div className="text-white/50 text-xs">星星</div>
          </div>
          <div className="bg-cyan-500/20 rounded-xl p-3">
            <div className="text-2xl">⚡</div>
            <div className="text-cyan-300 font-bold text-lg">{state.energy}</div>
            <div className="text-white/50 text-xs">能源</div>
          </div>
          <div className="bg-purple-500/20 rounded-xl p-3">
            <div className="text-2xl">🏅</div>
            <div className="text-purple-300 font-bold text-lg">{state.badges.length}</div>
            <div className="text-white/50 text-xs">徽章</div>
          </div>
        </div>

        {/* Rank */}
        <div className="bg-white/10 rounded-2xl px-4 py-2 mb-5">
          <span className="text-white/60 text-sm">評分：</span>
          <span className="text-white font-bold text-lg ml-2">{rank}</span>
        </div>

        {/* Badges earned */}
        {state.badges.length > 0 && (
          <div className="mb-5">
            <p className="text-white/60 text-sm mb-2">獲得的徽章：</p>
            <div className="flex flex-wrap justify-center gap-2">
              {state.badges.map((id) => (
                <span key={id} className="text-2xl" title={ALL_BADGES[id].name}>
                  {ALL_BADGES[id].emoji}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Restart button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-cyan-500/30 transition-all"
        >
          🚀 再次冒險！
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
