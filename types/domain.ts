export type ExamType = "GATE" | "JEE" | "NEET" | "CUET" | "SCHOOL";

export type LearningStyle =
  | "visual"
  | "practice-first"
  | "story"
  | "formula-led"
  | "mixed";

export type StudentProfile = {
  id: string;
  name: string;
  exam: ExamType;
  targetRank?: number;
  dailyStudyHours: number;
  weakSubjects: string[];
  strongSubjects: string[];
  learningStyle: LearningStyle;
  targetExamDate?: string;
};

export type Recommendation = {
  kind: "topic" | "test" | "revision" | "weak-area";
  title: string;
  reason: string;
  priority: "low" | "medium" | "high";
  href: string;
};

export type PulseMetrics = {
  accuracy: number;
  speed: number;
  focus: number;
  consistency: number;
  masteryScore: number;
  learningVelocity: number;
};

export type DashboardSnapshot = {
  greetingName: string;
  streak: number;
  studyHoursToday: number;
  readinessScore: number;
  recommendedTopic: string;
  upcomingRevision: string;
  questionsSolved: number;
  accuracy: number;
  weeklyGrowth: number;
};

export type SparkEventType =
  | "quiz"
  | "revision"
  | "streak"
  | "study_session"
  | "goal"
  | "weak_topic"
  | "consistency"
  | "focus"
  | "achievement";

export type SparkChallengePeriod = "daily" | "weekly" | "monthly";

export type SparkLeaderboardScope = "friends" | "exam" | "institution" | "weekly" | "monthly";

export type SparkRewardCategory = "theme" | "profile_frame" | "badge" | "avatar" | "customization";

export type SparkLevelMilestone = {
  level: number;
  title: string;
  xpThreshold: number;
  badge?: string;
  unlocks: string[];
};

export type SparkAchievement = {
  id: string;
  code: string;
  title: string;
  description: string;
  category: "streak" | "quiz" | "revision" | "goal" | "readiness" | "focus";
  xpReward: number;
  progress: number;
  target: number;
  unlocked: boolean;
};

export type SparkChallenge = {
  id: string;
  title: string;
  period: SparkChallengePeriod;
  target: string;
  progress: number;
  xpReward: number;
  dueLabel: string;
};

export type SparkLeaderboardEntry = {
  rank: number;
  name: string;
  score: number;
  delta: number;
  avatar?: string;
  visible: boolean;
};

export type SparkStoreItem = {
  id: string;
  title: string;
  category: SparkRewardCategory;
  xpCost: number;
  description: string;
  available: boolean;
};

export type SparkAnalyticsSnapshot = {
  dau: number;
  consistency: number;
  streakRetention: number;
  goalCompletion: number;
  challengeCompletion: number;
  averageSessionMinutes: number;
};

export type ChatTurn = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};
