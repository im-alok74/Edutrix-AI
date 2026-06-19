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

export type ChatTurn = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};
