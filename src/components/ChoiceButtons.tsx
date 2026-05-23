"use client";

import { motion } from "framer-motion";
import { Choice } from "@/types/game";
import { useSound } from "@/hooks/useSound";

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoose: (choice: Choice) => void;
  disabled: boolean;
}

export default function ChoiceButtons({ choices, onChoose, disabled }: ChoiceButtonsProps) {
  const { play } = useSound();

  const handleClick = (choice: Choice) => {
    if (disabled) return;
    play("click");
    onChoose(choice);
  };

  const getEffectPreview = (choice: Choice) => {
    const parts: string[] = [];
    if (choice.effect.stars && choice.effect.stars > 0)
      parts.push(`+${choice.effect.stars}⭐`);
    if (choice.effect.energy && choice.effect.energy > 0)
      parts.push(`+${Math.abs(choice.effect.energy)}⚡`);
    if (choice.effect.energy && choice.effect.energy < 0)
      parts.push(`-${Math.abs(choice.effect.energy)}⚡`);
    return parts.join("  ");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="space-y-3"
    >
      <p className="text-center text-white/50 text-sm font-semibold tracking-wide">
        你會怎麼做？
      </p>
      {choices.map((choice, i) => (
        <motion.button
          key={choice.id}
          initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.15 }}
          whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
          whileTap={!disabled ? { scale: 0.97 } : {}}
          onClick={() => handleClick(choice)}
          disabled={disabled}
          className={`
            choice-btn w-full relative overflow-hidden
            bg-gradient-to-r from-indigo-700/80 to-purple-700/80
            hover:from-indigo-600/90 hover:to-purple-600/90
            border border-white/20 hover:border-cyan-400/60
            rounded-2xl px-4 py-4 sm:py-5
            text-left transition-all duration-200
            shadow-lg hover:shadow-cyan-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            group
          `}
        >
          {/* Glow overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl" />

          <div className="relative flex items-center gap-3">
            <span className="text-2xl sm:text-3xl shrink-0 group-hover:animate-bounce-soft">
              {choice.emoji}
            </span>
            <div className="flex-1">
              <p className="text-white font-bold text-sm sm:text-base leading-tight">
                {choice.text}
              </p>
              {getEffectPreview(choice) && (
                <p className="text-white/50 text-xs mt-1 font-medium">
                  {getEffectPreview(choice)}
                </p>
              )}
            </div>
            <span className="text-white/30 text-xl group-hover:text-cyan-400 transition-colors">
              ›
            </span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
