import { Scene } from "@/types/game";

export const STORY_SCENES: Record<string, Scene> = {
  scene_01: {
    id: "scene_01",
    title: "太空警報！",
    background: "from-indigo-950 via-purple-950 to-slate-950",
    narration: "清晨，宇宙基地的警報突然響起！",
    dialogue:
      "小明！小明！快醒來！太空出現了神秘能量波，只有你才能解決這個任務！",
    character: "指揮官歐巴",
    characterEmoji: "👨‍✈️",
    choices: [
      {
        id: "c1a",
        text: "我準備好了！出發！",
        emoji: "🚀",
        effect: {
          stars: 5,
          energy: 0,
          badges: ["brave_start"],
          nextScene: "scene_02",
        },
      },
      {
        id: "c1b",
        text: "我可以先吃早餐嗎？",
        emoji: "🥞",
        effect: {
          stars: 2,
          energy: 10,
          nextScene: "scene_02",
        },
      },
    ],
  },

  scene_02: {
    id: "scene_02",
    title: "穿上太空衣",
    background: "from-blue-950 via-indigo-900 to-purple-950",
    narration: "裝備室裡放著各種超酷的太空裝備！",
    dialogue: "快點選一套太空衣吧！紅色的超強防護，藍色的飛行速度超快！",
    character: "機器人助手 R2",
    characterEmoji: "🤖",
    choices: [
      {
        id: "c2a",
        text: "選紅色太空衣（防護+）",
        emoji: "🔴",
        effect: {
          stars: 3,
          energy: -5,
          nextScene: "scene_03",
        },
      },
      {
        id: "c2b",
        text: "選藍色太空衣（速度+）",
        emoji: "🔵",
        effect: {
          stars: 3,
          energy: 5,
          nextScene: "scene_03",
        },
      },
    ],
  },

  scene_03: {
    id: "scene_03",
    title: "登上飛船！",
    background: "from-slate-950 via-blue-950 to-indigo-950",
    narration: "超酷的星際飛船停在發射台上，等著你！",
    dialogue:
      "隊長！飛船已經準備好了！但是有兩條路線，快速路線很刺激，安全路線比較穩，要選哪一條？",
    character: "副駕駛莉莉",
    characterEmoji: "👩‍🚀",
    choices: [
      {
        id: "c3a",
        text: "走快速路線！越快越好！",
        emoji: "⚡",
        effect: {
          stars: 8,
          energy: -15,
          nextScene: "scene_04",
        },
      },
      {
        id: "c3b",
        text: "走安全路線，穩穩到達",
        emoji: "🛡️",
        effect: {
          stars: 4,
          energy: 5,
          badges: ["energy_saver"],
          nextScene: "scene_04",
        },
      },
    ],
  },

  scene_04: {
    id: "scene_04",
    title: "太空怪獸出現！",
    background: "from-red-950 via-purple-950 to-indigo-950",
    narration: "突然！一隻巨大的太空怪獸出現在飛船前方！",
    dialogue:
      "哇！是星際章魚怪！牠看起來很害怕……還是很生氣？隊長，我們要怎麼辦？",
    character: "副駕駛莉莉",
    characterEmoji: "👩‍🚀",
    choices: [
      {
        id: "c4a",
        text: "用友善的方式打招呼！",
        emoji: "👋",
        effect: {
          stars: 10,
          energy: 0,
          badges: ["kind_heart"],
          nextScene: "scene_05",
        },
      },
      {
        id: "c4b",
        text: "快速繞過牠，繼續前進",
        emoji: "💨",
        effect: {
          stars: 5,
          energy: -10,
          nextScene: "scene_05",
        },
      },
    ],
  },

  scene_05: {
    id: "scene_05",
    title: "神秘星球",
    background: "from-emerald-950 via-teal-900 to-cyan-950",
    narration: "飛船抵達了一顆閃閃發光的綠色星球！",
    dialogue:
      "哇！這顆星球上有好多閃光的晶石！但是……有個奇怪的告示牌說「小心陷阱」！",
    character: "探測器 BEEP",
    characterEmoji: "📡",
    choices: [
      {
        id: "c5a",
        text: "仔細研究告示牌的意思",
        emoji: "🔍",
        effect: {
          stars: 6,
          energy: 0,
          badges: ["smart_thinker"],
          nextScene: "scene_06",
        },
      },
      {
        id: "c5b",
        text: "直接衝進去拿晶石！",
        emoji: "💎",
        effect: {
          stars: 12,
          energy: -20,
          nextScene: "scene_06",
        },
      },
    ],
  },

  scene_06: {
    id: "scene_06",
    title: "外星新朋友",
    background: "from-violet-950 via-purple-900 to-pink-950",
    narration: "在星球深處，你們遇到了一群可愛的外星小朋友！",
    dialogue:
      "你好！我是外星人小布！我們的村子被一個壞機器人困住了……你們能幫幫我們嗎？",
    character: "外星人小布",
    characterEmoji: "👽",
    choices: [
      {
        id: "c6a",
        text: "當然！我們馬上去幫你們！",
        emoji: "🦸",
        effect: {
          stars: 8,
          energy: -5,
          badges: ["team_player"],
          nextScene: "scene_07",
        },
      },
      {
        id: "c6b",
        text: "我們有自己的任務，抱歉",
        emoji: "😔",
        effect: {
          stars: 2,
          energy: 5,
          nextScene: "scene_07b",
        },
      },
    ],
  },

  scene_07: {
    id: "scene_07",
    title: "解開機器人謎題",
    background: "from-amber-950 via-orange-900 to-red-950",
    narration: "壞機器人守著村子的大門！牠面前有三個謎題！",
    dialogue:
      "嘿！想進來嗎？回答我的問題！「什麼東西越分享，就越多？」快說！",
    character: "壞機器人 IRON-BAD",
    characterEmoji: "🤖",
    choices: [
      {
        id: "c7a",
        text: "是「快樂和愛」！越分享越多！",
        emoji: "❤️",
        effect: {
          stars: 15,
          energy: 5,
          badges: ["smart_thinker"],
          nextScene: "scene_08",
        },
      },
      {
        id: "c7b",
        text: "是「糖果」！分享糖果越多越好！",
        emoji: "🍬",
        effect: {
          stars: 5,
          energy: -10,
          nextScene: "scene_08",
        },
      },
    ],
  },

  scene_07b: {
    id: "scene_07b",
    title: "孤獨的路",
    background: "from-gray-950 via-slate-900 to-blue-950",
    narration: "你們決定繼續自己的任務……但外星小朋友傷心的眼神讓你很難受。",
    dialogue:
      "也許……我們應該回去幫幫他們？一個真正的隊長，會照顧大家的！",
    character: "副駕駛莉莉",
    characterEmoji: "👩‍🚀",
    choices: [
      {
        id: "c7ba",
        text: "你說得對！我們回去幫他們！",
        emoji: "🔄",
        effect: {
          stars: 5,
          energy: -5,
          badges: ["kind_heart"],
          nextScene: "scene_08",
        },
      },
      {
        id: "c7bb",
        text: "繼續前進，任務優先",
        emoji: "➡️",
        effect: {
          stars: 0,
          energy: 0,
          nextScene: "scene_08",
        },
      },
    ],
  },

  scene_08: {
    id: "scene_08",
    title: "能量危機！",
    background: "from-red-950 via-orange-950 to-yellow-950",
    narration: "警報！飛船的能源快用完了！只剩最後一點點了！",
    dialogue:
      "隊長！緊急狀況！引擎能源只剩30%！附近有兩個地方可以補充——太陽能板或晶石礦，要去哪裡？",
    character: "機器人助手 R2",
    characterEmoji: "🤖",
    choices: [
      {
        id: "c8a",
        text: "去找太陽能板，安全穩定",
        emoji: "☀️",
        effect: {
          stars: 5,
          energy: 30,
          badges: ["energy_saver"],
          nextScene: "scene_09",
        },
      },
      {
        id: "c8b",
        text: "衝去晶石礦，快速補充",
        emoji: "💎",
        effect: {
          stars: 10,
          energy: 20,
          nextScene: "scene_09",
        },
      },
    ],
  },

  scene_09: {
    id: "scene_09",
    title: "星際大風暴",
    background: "from-blue-950 via-cyan-900 to-teal-950",
    narration: "突然，一場超大的星際風暴向飛船衝來！",
    dialogue:
      "天啊！磁力風暴！我們被困住了！電腦說有兩種逃脫方法：全速衝出，或者靜靜等待風暴過去。",
    character: "副駕駛莉莉",
    characterEmoji: "👩‍🚀",
    choices: [
      {
        id: "c9a",
        text: "全速衝出！我們衝破風暴！",
        emoji: "🌪️",
        effect: {
          stars: 12,
          energy: -25,
          nextScene: "scene_10",
        },
      },
      {
        id: "c9b",
        text: "靜靜等待，風暴會過去的",
        emoji: "🧘",
        effect: {
          stars: 6,
          energy: 10,
          badges: ["smart_thinker"],
          nextScene: "scene_10",
        },
      },
    ],
  },

  scene_10: {
    id: "scene_10",
    title: "隱藏的星星寶藏",
    background: "from-yellow-950 via-amber-900 to-orange-950",
    narration: "風暴過後，你們發現了一個神秘的漂浮島嶼！",
    dialogue:
      "隊長！掃描顯示這裡有一個古老的寶藏室！裡面有很多星星！但是……需要解開一個密碼鎖。",
    character: "探測器 BEEP",
    characterEmoji: "📡",
    choices: [
      {
        id: "c10a",
        text: "仔細解開密碼，打開寶藏室",
        emoji: "🔐",
        effect: {
          stars: 20,
          energy: -5,
          badges: ["star_collector", "explorer"],
          nextScene: "scene_11",
        },
      },
      {
        id: "c10b",
        text: "沒時間了，繼續主要任務",
        emoji: "⏩",
        effect: {
          stars: 0,
          energy: 5,
          nextScene: "scene_11",
        },
      },
    ],
  },

  scene_11: {
    id: "scene_11",
    title: "最終決戰！",
    background: "from-purple-950 via-red-950 to-indigo-950",
    narration:
      "終於找到了製造神秘能量波的源頭——一個巨大的黑洞機器！",
    dialogue:
      "就是這裡！操控黑洞機器的是一個孤獨的星際機器人，牠說牠只是想要朋友……",
    character: "副駕駛莉莉",
    characterEmoji: "👩‍🚀",
    choices: [
      {
        id: "c11a",
        text: "和機器人交朋友，請牠停下",
        emoji: "🤝",
        effect: {
          stars: 15,
          energy: 0,
          badges: ["peace_maker"],
          nextScene: "scene_12_peace",
        },
      },
      {
        id: "c11b",
        text: "勇敢關掉黑洞機器",
        emoji: "⚔️",
        effect: {
          stars: 10,
          energy: -15,
          badges: ["true_hero"],
          nextScene: "scene_12_hero",
        },
      },
    ],
  },

  scene_12_peace: {
    id: "scene_12_peace",
    title: "友誼的力量",
    background: "from-pink-950 via-purple-900 to-violet-950",
    narration: "你伸出友善的手，機器人慢慢放下了武器……",
    dialogue:
      "真……真的嗎？你願意當我的朋友？好久了……我好久沒有朋友了。謝謝你，小隊長！",
    character: "孤獨機器人 LONE",
    characterEmoji: "🥺",
    choices: [
      {
        id: "c12pa",
        text: "當然！我們一起保護宇宙！",
        emoji: "🌟",
        effect: {
          stars: 20,
          energy: 20,
          badges: ["space_legend"],
          nextScene: "ending_peace",
        },
      },
    ],
  },

  scene_12_hero: {
    id: "scene_12_hero",
    title: "英雄的抉擇",
    background: "from-orange-950 via-red-900 to-purple-950",
    narration: "你鼓起勇氣，朝著黑洞機器的控制台衝去！",
    dialogue:
      "隊長！注意！機器人在反抗！但是你已經快到了！再加油！！",
    character: "副駕駛莉莉",
    characterEmoji: "👩‍🚀",
    choices: [
      {
        id: "c12ha",
        text: "全力衝刺！關掉機器！",
        emoji: "💪",
        effect: {
          stars: 25,
          energy: -20,
          badges: ["true_hero", "space_legend"],
          nextScene: "ending_hero",
        },
      },
    ],
  },

  ending_peace: {
    id: "ending_peace",
    title: "和平結局：宇宙的新朋友",
    background: "from-pink-900 via-purple-800 to-indigo-900",
    narration:
      "太好了！黑洞機器被友誼之力關掉了！宇宙再次恢復平靜！",
    dialogue:
      "你做到了，小隊長！用愛與友善化解了危機！LONE 現在是我們最好的夥伴！全宇宙都在為你歡呼！",
    character: "指揮官歐巴",
    characterEmoji: "👨‍✈️",
    choices: [],
    isEnding: true,
    endingType: "peace",
  },

  ending_hero: {
    id: "ending_hero",
    title: "英雄結局：宇宙的守護者",
    background: "from-yellow-900 via-orange-800 to-red-900",
    narration:
      "砰！你關掉了黑洞機器！宇宙的危機解除了！全銀河系都在慶祝！",
    dialogue:
      "太厲害了！我們的小隊長！你的勇氣拯救了整個宇宙！你是真正的太空英雄！歡迎回家，傳奇隊長！",
    character: "指揮官歐巴",
    characterEmoji: "👨‍✈️",
    choices: [],
    isEnding: true,
    endingType: "hero",
  },

  ending_explorer: {
    id: "ending_explorer",
    title: "探險家結局：宇宙探索者",
    background: "from-cyan-900 via-teal-800 to-emerald-900",
    narration: "你選擇了繼續探索宇宙，發現了更多神奇的地方！",
    dialogue:
      "太空隊長，你發現的新星球數量打破了所有紀錄！宇宙這麼大，還有好多地方等著你去探索！",
    character: "指揮官歐巴",
    characterEmoji: "👨‍✈️",
    choices: [],
    isEnding: true,
    endingType: "explorer",
  },
};
