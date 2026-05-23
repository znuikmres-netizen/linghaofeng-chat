"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GameState, ALL_BADGES } from "@/types/game";
import { useState } from "react";

interface GameHUDProps {
  state: GameState;
  sceneTitle: string;
  sceneNumber: number;
  totalScenes: number;
}

export default function GameHUD({ state, sceneTitle, sceneNumber, totalScenes }: GameHUDProps) {
  const [showBadges, setShowBadges] = useState(false);
  const energyColor =
    state.energy > 60
      ? "from-emerald-400 to-cyan-400"
      : state.energy > 30
      ? "from-yellow-400 to-orange-400"
      : "from-red-500 to-rose-400";

  const energyWarning = state.energy <= 20;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 safe-top">
        <div className="bg-black/40 backdrop-blur-md border-b border-white/10 px-3 py-2 sm:px-5 sm:py-3">
          <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
            {/* Stars */}
            <motion.div
              className="flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-400/40 rounded-full px-3 py-1.5"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg sm:text-xl">⭐</span>
              <motion.span
                key={state.stars}
                initial={{ scale: 1.5, color: "#FFD700" }}
                animate={{ scale: 1, color: "#FFFFFF" }}
                className="font-bold text-sm sm:text-base text-white font-display"
              >
                {state.stars}
              </motion.span>
            </motion.div>

            {/* Scene Title */}
            <div className="flex-1 text-center">
              <p className="text-white/50 text-xs mb-0.5">
                場景 {sceneNumber}/{totalScenes}
              </p>
              <h1 className="text-white text-sm sm:text-base font-bold leading-tight truncate">
                {sceneTitle}
              </h1>
            </div>

            {/* Badges Button */}
            <motion.button
              onClick={() => setShowBadges(true)}
              className="flex items-center gap-1 bg-purple-500/20 border border-purple-400/40 rounded-full px-2.5 py-1.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">🏅</span>
              <span className="text-white font-bold text-sm">{state.badges.length}</span>
            </motion.button>
          </div>

          {/* Energy Bar */}
          <div className="max-w-2xl mx-auto mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 shrink-0">
                {energyWarning ? "⚠️" : "⚡"} 能源
              </span>
              <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${energyColor}`}
                  initial={false}
                  animate={{ width: `${state.energy}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span
                className={`text-xs font-bold shrink-0 ${energyWarning ? "text-red-400" : "text-white/80"}`}
              >
                {state.energy}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Panel */}
      <AnimatePresence>
        {showBadges && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBadges(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-gradient-to-br from-purple-900 to-indigo-900 border border-purple-400/40 rounded-3xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-center mb-4 glow-cyan">
                🏅 我的徽章
              </h2>
              {state.badges.length === 0 ? (
                <p className="text-center text-white/50 py-6">還沒有徽章，繼續冒險吧！</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {state.badges.map((id) => {
                    const badge = ALL_BADGES[id];
                    return (
                      <motion.div
                        key={id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-white/10 rounded-2xl p-3 text-center"
                      >
                        <div className="text-3xl mb-1">{badge.emoji}</div>
                        <div className="text-white font-bold text-sm">{badge.name}</div>
                        <div className="text-white/50 text-xs mt-1">{badge.description}</div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
              <button
                onClick={() => setShowBadges(false)}
                className="mt-5 w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 rounded-2xl transition-colors"
              >
                繼續冒險！
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
