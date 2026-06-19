import type { PulseMetrics, Recommendation, StudentProfile } from "@/types/domain";

export interface StudentModelProvider {
  getProfile(userId: string): Promise<StudentProfile>;
  getPulse(userId: string): Promise<PulseMetrics>;
}

export interface RecommendationProvider {
  getRecommendations(userId: string): Promise<Recommendation[]>;
}

export interface KnowledgeTracingProvider {
  updateAfterAttempt(input: {
    userId: string;
    topicId: string;
    correct: boolean;
    timeTakenSec: number;
  }): Promise<{ masteryScore: number; nextRevisionDays: number }>;
}
