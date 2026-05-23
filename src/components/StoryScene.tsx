"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scene } from "@/types/game";
import DialogueBox from "./DialogueBox";
import CharacterArea from "./CharacterArea";
import ChoiceButtons from "./ChoiceButtons";

interface StorySceneProps {
  scene: Scene;
  onChoice: (choiceId: string, nextScene: string, stars: number, energy: number, badges?: import("@/types/game").BadgeId[]) => void;
  isTransitioning: boolean;
}

export default function StoryScene({ scene, onChoice, isTransitioning }: StorySceneProps) {
  const [dialogueDone, setDialogueDone] = useState(false);
  const [choicesMade, setChoicesMade] = useState(false);

  useEffect(() => {
    setDialogueDone(false);
    setChoicesMade(false);
  }, [scene.id]);

  const handleDialogueComplete = useCallback(() => {
    setDialogueDone(true);
  }, []);

  const handleChoice = useCallback(
    (choice: import("@/types/game").Choice) => {
      if (choicesMade || isTransitioning) return;
      setChoicesMade(true);
      onChoice(
        choice.id,
        choice.effect.nextScene,
        choice.effect.stars ?? 0,
        choice.effect.energy ?? 0,
        choice.effect.badges
      );
    },
    [choicesMade, isTransitioning, onChoice]
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene.id}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full h-full flex flex-col"
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${scene.background} transition-all duration-1000`}
        />

        {/* Nebula overlay */}
        <div className="absolute inset-0 bg-nebula-gradient opacity-50 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full pt-[88px] sm:pt-[96px] pb-safe-bottom">
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-5 py-4">
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Character + Narration */}
              <CharacterArea
                characterName={scene.character}
                characterEmoji={scene.characterEmoji}
                dialogue={scene.dialogue}
                narration={scene.narration}
                showChoices={dialogueDone}
              />

              {/* Dialogue Box */}
              <DialogueBox
                characterName={scene.character}
                characterEmoji={scene.characterEmoji}
                dialogue={scene.dialogue}
                onComplete={handleDialogueComplete}
                isComplete={dialogueDone}
              />

              {/* Choices */}
              <AnimatePresence>
                {dialogueDone && scene.choices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ChoiceButtons
                      choices={scene.choices}
                      onChoose={handleChoice}
                      disabled={choicesMade || isTransitioning}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Single choice (story progression) */}
              {dialogueDone && scene.choices.length === 1 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => handleChoice(scene.choices[0])}
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold py-4 rounded-2xl text-lg mt-2"
                >
                  {scene.choices[0].emoji} {scene.choices[0].text}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
