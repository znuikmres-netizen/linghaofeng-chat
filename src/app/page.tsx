"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { STORY_SCENES } from "@/data/story";
import { useGameState } from "@/hooks/useGameState";
import { BadgeId } from "@/types/game";
import GameHUD from "@/components/GameHUD";
import StoryScene from "@/components/StoryScene";
import TitleScreen from "@/components/TitleScreen";
import RewardPopup from "@/components/RewardPopup";
import EndingScreen from "@/components/EndingScreen";
import StarField from "@/components/StarField";

interface PendingReward {
  stars: number;
  energy: number;
  badges: BadgeId[];
}

const SCENE_ORDER = [
  "scene_01", "scene_02", "scene_03", "scene_04", "scene_05",
  "scene_06", "scene_07", "scene_07b", "scene_08", "scene_09",
  "scene_10", "scene_11", "scene_12_peace", "scene_12_hero",
  "ending_peace", "ending_hero", "ending_explorer",
];

export default function GamePage() {
  const [gameState, actions] = useGameState();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingReward, setPendingReward] = useState<PendingReward | null>(null);

  const currentScene = STORY_SCENES[gameState.currentSceneId];

  const sceneNumber = Math.max(
    1,
    Object.keys(gameState.choicesMade).length + 1
  );

  const handleChoice = useCallback(
    (choiceId: string, nextScene: string, stars: number, energy: number, badges?: BadgeId[]) => {
      const hasReward = stars > 0 || energy !== 0 || (badges && badges.length > 0);
      if (hasReward) {
        setPendingReward({ stars, energy, badges: badges ?? [] });
      }
      setIsTransitioning(true);
      setTimeout(() => {
        actions.makeChoice(choiceId, nextScene, stars, energy, badges);
        setIsTransitioning(false);
      }, hasReward ? 2800 : 400);
    },
    [actions]
  );

  const handleRewardClose = useCallback(() => {
    setPendingReward(null);
  }, []);

  if (!gameState.isStarted) {
    return (
      <main className="relative w-full h-screen overflow-hidden bg-space-deep">
        <StarField />
        <TitleScreen
          onStart={actions.startGame}
          onContinue={actions.loadSave}
          hasSave={actions.hasSave}
        />
      </main>
    );
  }

  if (gameState.isEnded && currentScene?.isEnding) {
    return (
      <main className="relative w-full h-screen overflow-hidden">
        <StarField />
        <EndingScreen
          state={gameState}
          endingType={currentScene.endingType ?? "hero"}
          title={currentScene.title}
          dialogue={currentScene.dialogue}
          characterEmoji={currentScene.characterEmoji}
          onRestart={actions.restartGame}
        />
      </main>
    );
  }

  if (!currentScene) {
    return (
      <main className="flex items-center justify-center h-screen bg-space-deep text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🚀</div>
          <p className="text-xl">場景載入中...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-space-deep">
      <StarField />

      <AnimatePresence>
        <StoryScene
          key={gameState.currentSceneId}
          scene={currentScene}
          onChoice={handleChoice}
          isTransitioning={isTransitioning}
        />
      </AnimatePresence>

      <GameHUD
        state={gameState}
        sceneTitle={currentScene.title}
        sceneNumber={sceneNumber}
        totalScenes={11}
      />

      <AnimatePresence>
        {pendingReward && (
          <RewardPopup
            key="reward"
            stars={pendingReward.stars}
            energy={pendingReward.energy}
            badges={pendingReward.badges}
            onClose={handleRewardClose}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
