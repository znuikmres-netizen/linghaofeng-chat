"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BadgeId, ALL_BADGES } from "@/types/game";
import { useEffect } from "react";
import { useSound } from "@/hooks/useSound";

interface RewardPopupProps {
  stars: number;
  energy: number;
  badges: BadgeId[];
  onClose: () => void;
}

interface StarParticle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const particles: StarParticle[] = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 8) * Math.PI * 2) * 60,
  y: Math.sin((i / 8) * Math.PI * 2) * 60,
  delay: i * 0.05,
}));

export default function RewardPopup({ stars, energy, badges, onClose }: RewardPopupProps) {
  const { play } = useSound();
  const hasRewards = stars > 0 || energy !== 0 || badges.length > 0;

  useEffect(() => {
    if (!hasRewards) {
      onClose();
      return;
    }
    if (badges.length > 0) play("badge");
    else if (stars > 0) play("star");

    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [hasRewards, stars, badges.length, play, onClose]);

  if (!hasRewards) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0.5, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.5, y: -30, opacity: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
          className="relative pointer-events-auto"
          onClick={onClose}
        >
          {/* Star particles */}
          {stars > 0 &&
            particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: p.x, y: p.y, scale: 1.5, opacity: 0 }}
                transition={{ delay: p.delay, duration: 0.6, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-xl pointer-events-none"
              >
                ⭐
              </motion.div>
            ))}

          <div className="bg-gradient-to-br from-yellow-900/90 to-amber-900/90 backdrop-blur-md border-2 border-yellow-400/60 rounded-3xl px-8 py-6 text-center shadow-2xl shadow-yellow-500/30 min-w-[200px]">
            {/* Stars reward */}
            {stars > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-3"
              >
                <div className="text-4xl mb-1">⭐</div>
                <div className="text-yellow-300 font-bold text-xl glow-gold">
                  +{stars} 星星！
                </div>
              </motion.div>
            )}

            {/* Energy reward */}
            {energy !== 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mb-3"
              >
                <div className={`font-bold text-lg ${energy > 0 ? "text-cyan-300" : "text-red-400"}`}>
                  {energy > 0 ? "⚡" : "💔"} {energy > 0 ? `+${energy}` : energy} 能源
                </div>
              </motion.div>
            )}

            {/* Badges */}
            {badges.map((id, i) => {
              const badge = ALL_BADGES[id];
              return (
                <motion.div
                  key={id}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  className="mb-2 bg-purple-900/60 rounded-2xl px-4 py-2"
                >
                  <div className="text-3xl">{badge.emoji}</div>
                  <div className="text-purple-200 font-bold text-sm">
                    獲得徽章：{badge.name}！
                  </div>
                </motion.div>
              );
            })}

            <p className="text-white/40 text-xs mt-2">點擊繼續</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
