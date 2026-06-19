import type {
  SparkAchievement,
  SparkAnalyticsSnapshot,
  SparkChallenge,
  SparkLeaderboardEntry,
  SparkLevelMilestone,
  SparkRewardCategory,
  SparkStoreItem
} from "@/types/domain";

type SparkBand = {
  min: number;
  max: number;
  title: string;
  badge: string;
};

const sparkBands: SparkBand[] = [
  { min: 1, max: 10, title: "Rising Learner", badge: "Starter Arc" },
  { min: 11, max: 20, title: "Topic Master", badge: "Focus Arc" },
  { min: 21, max: 35, title: "Revision Hero", badge: "Momentum Arc" },
  { min: 36, max: 50, title: "Consistency Champion", badge: "Discipline Arc" },
  { min: 51, max: 70, title: "Exam Warrior", badge: "Battle Arc" },
  { min: 71, max: 90, title: "Grand Scholar", badge: "Scholar Arc" },
  { min: 91, max: 100, title: "Legacy Mentor", badge: "Crown Arc" }
];

function getBand(level: number) {
  return sparkBands.find((band) => level >= band.min && level <= band.max) ?? sparkBands[sparkBands.length - 1];
}

export function getSparkLevelMilestone(level: number): SparkLevelMilestone {
  const band = getBand(level);
  return {
    level,
    title: `${band.title} ${level}`,
    xpThreshold: level * level * 50,
    badge: band.badge,
    unlocks: [
      `Badge: ${band.title}`,
      `Profile frame tier ${Math.ceil(level / 10)}`,
      level % 10 === 0 ? "Achievement unlock" : "Challenge boost"
    ]
  };
}

export function getSparkLevelTitle(level: number) {
  return getBand(level).title;
}

export function getSparkXpWindow(level: number) {
  const currentThreshold = level * level * 50;
  const nextThreshold = Math.min(100, level + 1) ** 2 * 50;
  return { currentThreshold, nextThreshold };
}

export function getSparkProgress(xp: number, level: number) {
  const { currentThreshold, nextThreshold } = getSparkXpWindow(level);
  const span = Math.max(nextThreshold - currentThreshold, 1);
  return Math.max(0, Math.min(100, ((xp - currentThreshold) / span) * 100));
}

export const sparkProfile = {
  name: "Alok",
  level: 8,
  xp: 3240,
  nextLevelXp: 4050,
  title: getSparkLevelTitle(8),
  currentStreak: 12,
  bestStreak: 31,
  weeklyStreak: 4,
  revisionStreak: 9,
  quizStreak: 6,
  streakShields: 1,
  focusXp: 640,
  masteredTopics: 18,
  learningRank: "Grand Scholar in progress",
  readinessScore: 78,
  dailyQuote: "Consistency beats intensity.",
  progressMessage: "You are 5 questions away from mastering Probability.",
  encouragement: "Today's effort is tomorrow's rank.",
  nextUnlock: "Level 9 unlocks the Revision Hero badge frame.",
  recoveryHint: "Save one streak shield for your toughest exam week."
};

export const sparkAchievements: SparkAchievement[] = [
  {
    id: "ach-first-quiz",
    code: "first-quiz",
    title: "First Quiz",
    description: "Complete your first quiz and start the Spark journey.",
    category: "quiz",
    xpReward: 50,
    progress: 1,
    target: 1,
    unlocked: true
  },
  {
    id: "ach-7-day",
    code: "7-day-streak",
    title: "7 Day Streak",
    description: "Keep the engine warm for one full week.",
    category: "streak",
    xpReward: 100,
    progress: 7,
    target: 7,
    unlocked: true
  },
  {
    id: "ach-30-day",
    code: "30-day-streak",
    title: "30 Day Streak",
    description: "A month of consistency deserves a bigger celebration.",
    category: "streak",
    xpReward: 250,
    progress: 12,
    target: 30,
    unlocked: false
  },
  {
    id: "ach-100-questions",
    code: "100-questions",
    title: "100 Questions Solved",
    description: "Build momentum with repeated wins.",
    category: "quiz",
    xpReward: 150,
    progress: 64,
    target: 100,
    unlocked: false
  },
  {
    id: "ach-mastered-topic",
    code: "mastered-topic",
    title: "Mastered Topic",
    description: "Turn one weak topic into a confident topic.",
    category: "readiness",
    xpReward: 180,
    progress: 4,
    target: 5,
    unlocked: false
  },
  {
    id: "ach-goal-complete",
    code: "goal-complete",
    title: "Goal Completion",
    description: "Finish a study goal before it expires.",
    category: "goal",
    xpReward: 120,
    progress: 3,
    target: 5,
    unlocked: false
  }
];

export const sparkChallenges: SparkChallenge[] = [
  {
    id: "daily-20",
    title: "Solve 20 Questions",
    period: "daily",
    target: "20 questions",
    progress: 13,
    xpReward: 80,
    dueLabel: "Today"
  },
  {
    id: "weekly-2h",
    title: "Study 2 Hours",
    period: "weekly",
    target: "120 minutes",
    progress: 95,
    xpReward: 140,
    dueLabel: "This week"
  },
  {
    id: "monthly-3rev",
    title: "Complete 3 Revisions",
    period: "monthly",
    target: "3 revisions",
    progress: 2,
    xpReward: 220,
    dueLabel: "This month"
  }
];

export const sparkJourney = [
  { title: "Current Position", body: "Electrostatics: Capacitors", progress: 62, status: "active" },
  { title: "Completed Topics", body: "Vectors, Kinematics, Units", progress: 100, status: "done" },
  { title: "Upcoming Topic", body: "Energy Stored in Capacitors", progress: 18, status: "next" },
  { title: "Exam Progress", body: "Readiness ladder for GATE 2026", progress: 78, status: "roadmap" }
];

const friendsLeaderboard: SparkLeaderboardEntry[] = [
  { rank: 1, name: "Nitya", score: 4920, delta: 120, visible: true },
  { rank: 2, name: "Alok", score: 4680, delta: 84, visible: true },
  { rank: 3, name: "Rahul", score: 4410, delta: 55, visible: false }
];

const examLeaderboard: SparkLeaderboardEntry[] = [
  { rank: 1, name: "Aanya", score: 8120, delta: 240, visible: true },
  { rank: 2, name: "Alok", score: 7680, delta: 180, visible: true },
  { rank: 3, name: "Dev", score: 7440, delta: 150, visible: true }
];

const institutionLeaderboard: SparkLeaderboardEntry[] = [
  { rank: 1, name: "IIT Circle", score: 18120, delta: 410, visible: true },
  { rank: 2, name: "Alok", score: 16400, delta: 280, visible: true },
  { rank: 3, name: "Batch B", score: 15810, delta: 240, visible: false }
];

export const sparkLeaderboards = {
  friends: friendsLeaderboard,
  exam: examLeaderboard,
  institution: institutionLeaderboard,
  weekly: friendsLeaderboard,
  monthly: institutionLeaderboard
} as const satisfies Record<string, SparkLeaderboardEntry[]>;

export const sparkStore: SparkStoreItem[] = [
  {
    id: "store-theme-aurora",
    title: "Aurora Theme",
    category: "theme",
    xpCost: 1200,
    description: "Soft indigo + mint study atmosphere.",
    available: true
  },
  {
    id: "store-frame-gold",
    title: "Gold Frame",
    category: "profile_frame",
    xpCost: 1800,
    description: "A premium profile frame for proud streaks.",
    available: true
  },
  {
    id: "store-badge-boost",
    title: "Badge Spotlight",
    category: "badge",
    xpCost: 900,
    description: "Make an unlocked badge shine on your profile.",
    available: false
  },
  {
    id: "store-avatar-pack",
    title: "Study Avatar Pack",
    category: "avatar",
    xpCost: 1500,
    description: "Future-ready avatar customizations.",
    available: false
  }
];

export const sparkAnalytics: SparkAnalyticsSnapshot = {
  dau: 1840,
  consistency: 84,
  streakRetention: 71,
  goalCompletion: 63,
  challengeCompletion: 79,
  averageSessionMinutes: 42
};

export const sparkRetentionSeries = [
  { day: "Mon", consistency: 68, focus: 51 },
  { day: "Tue", consistency: 72, focus: 55 },
  { day: "Wed", consistency: 76, focus: 58 },
  { day: "Thu", consistency: 82, focus: 63 },
  { day: "Fri", consistency: 84, focus: 70 },
  { day: "Sat", consistency: 88, focus: 74 },
  { day: "Sun", consistency: 90, focus: 78 }
];

export const sparkNotifications = [
  "Your 15-day streak is waiting.",
  "Probability mastery increased by 4% yesterday.",
  "Today's revision is ready.",
  "You are one revision away from a new badge."
];

export const sparkLevelMilestones = Array.from({ length: 100 }, (_, index) => getSparkLevelMilestone(index + 1));
