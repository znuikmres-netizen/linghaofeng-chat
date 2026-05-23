"use client";

import { useState, useCallback, useEffect } from "react";
import { GameState, BadgeId, INITIAL_GAME_STATE } from "@/types/game";
import { saveGame, loadGame, clearGame, freshGame } from "@/utils/storage";

export interface GameActions {
  startGame: () => void;
  restartGame: () => void;
  loadSave: () => void;
  makeChoice: (choiceId: string, nextScene: string, stars: number, energy: number, badges?: BadgeId[]) => void;
  hasSave: boolean;
}

export function useGameState(): [GameState, GameActions] {
  const [state, setState] = useState<GameState>({ ...INITIAL_GAME_STATE });
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    try {
      setHasSave(localStorage.getItem("space_captain_save") !== null);
    } catch {
      setHasSave(false);
    }
  }, []);

  const startGame = useCallback(() => {
    const newState = freshGame();
    newState.isStarted = true;
    setState(newState);
    saveGame(newState);
  }, []);

  const restartGame = useCallback(() => {
    clearGame();
    const newState = freshGame();
    newState.isStarted = true;
    setState(newState);
    saveGame(newState);
    setHasSave(false);
  }, []);

  const loadSave = useCallback(() => {
    const saved = loadGame();
    if (saved) {
      setState(saved);
      setHasSave(true);
    }
  }, []);

  const makeChoice = useCallback(
    (choiceId: string, nextScene: string, stars: number, energy: number, badges?: BadgeId[]) => {
      setState((prev) => {
        const newStars = Math.max(0, prev.stars + stars);
        const newEnergy = Math.min(100, Math.max(0, prev.energy + energy));
        const newBadges = badges
          ? Array.from(new Set([...prev.badges, ...badges]))
          : prev.badges;
        const isEnding = nextScene.startsWith("ending_");

        const next: GameState = {
          ...prev,
          currentSceneId: nextScene,
          stars: newStars,
          energy: newEnergy,
          badges: newBadges,
          history: [...prev.history, prev.currentSceneId],
          isEnded: isEnding,
          choicesMade: { ...prev.choicesMade, [prev.currentSceneId]: choiceId },
        };
        saveGame(next);
        return next;
      });
    },
    []
  );

  return [
    state,
    { startGame, restartGame, loadSave, makeChoice, hasSave },
  ];
}
