export type BadgeId =
  | "brave_start"
  | "kind_heart"
  | "smart_thinker"
  | "energy_saver"
  | "star_collector"
  | "true_hero"
  | "peace_maker"
  | "explorer"
  | "team_player"
  | "space_legend";

export interface Badge {
  id: BadgeId;
  name: string;
  emoji: string;
  description: string;
}

export interface Choice {
  id: string;
  text: string;
  emoji: string;
  effect: {
    stars?: number;
    energy?: number;
    badges?: BadgeId[];
    nextScene: string;
  };
}

export interface Scene {
  id: string;
  title: string;
  background: string;
  narration: string;
  dialogue: string;
  character: string;
  characterEmoji: string;
  choices: Choice[];
  isEnding?: boolean;
  endingType?: "hero" | "peace" | "explorer" | "game_over";
}

export interface GameState {
  currentSceneId: string;
  stars: number;
  energy: number;
  badges: BadgeId[];
  history: string[];
  isStarted: boolean;
  isEnded: boolean;
  choicesMade: Record<string, string>;
}

export const INITIAL_GAME_STATE: GameState = {
  currentSceneId: "scene_01",
  stars: 0,
  energy: 100,
  badges: [],
  history: [],
  isStarted: false,
  isEnded: false,
  choicesMade: {},
};

export const ALL_BADGES: Record<BadgeId, Badge> = {
  brave_start: {
    id: "brave_start",
    name: "勇敢出發",
    emoji: "🚀",
    description: "接受了太空任務的挑戰！",
  },
  kind_heart: {
    id: "kind_heart",
    name: "善良之心",
    emoji: "💖",
    description: "選擇幫助了需要幫助的人！",
  },
  smart_thinker: {
    id: "smart_thinker",
    name: "聰明思考者",
    emoji: "🧠",
    description: "用智慧解決了難題！",
  },
  energy_saver: {
    id: "energy_saver",
    name: "能源守護者",
    emoji: "⚡",
    description: "保持了飛船能源充足！",
  },
  star_collector: {
    id: "star_collector",
    name: "星星收集家",
    emoji: "⭐",
    description: "收集了超多星星！",
  },
  true_hero: {
    id: "true_hero",
    name: "真正的英雄",
    emoji: "🦸",
    description: "完成了英雄結局！",
  },
  peace_maker: {
    id: "peace_maker",
    name: "和平使者",
    emoji: "🕊️",
    description: "用友善化解了衝突！",
  },
  explorer: {
    id: "explorer",
    name: "太空探險家",
    emoji: "🌌",
    description: "探索了神秘的宇宙！",
  },
  team_player: {
    id: "team_player",
    name: "最佳隊友",
    emoji: "🤝",
    description: "和夥伴合作解決了問題！",
  },
  space_legend: {
    id: "space_legend",
    name: "太空傳奇",
    emoji: "👑",
    description: "成為了宇宙中最偉大的隊長！",
  },
};
