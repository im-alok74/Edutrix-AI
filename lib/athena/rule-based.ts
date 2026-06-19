import { prisma } from "@/lib/db";
import type {
  KnowledgeTracingProvider,
  RecommendationProvider,
  StudentModelProvider
} from "@/lib/athena/interfaces";
import type { PulseMetrics, StudentProfile } from "@/types/domain";

export class RuleBasedStudentModelProvider implements StudentModelProvider {
  async getProfile(userId: string): Promise<StudentProfile> {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    return {
      id: user.id,
      name: user.name,
      exam: user.exam ?? "JEE",
      targetRank: user.targetRank ?? undefined,
      dailyStudyHours: user.dailyStudyHours,
      weakSubjects: user.weakSubjects,
      strongSubjects: user.strongSubjects,
      learningStyle: (user.learningStyle as StudentProfile["learningStyle"]) ?? "mixed",
      targetExamDate: user.targetExamDate?.toISOString()
    };
  }

  async getPulse(userId: string): Promise<PulseMetrics> {
    const [attempts, sessions, mastery] = await Promise.all([
      prisma.attempt.findMany({ where: { userId }, take: 100, orderBy: { createdAt: "desc" } }),
      prisma.studySession.findMany({ where: { userId }, take: 30, orderBy: { startedAt: "desc" } }),
      prisma.mastery.findMany({ where: { userId } })
    ]);
    const accuracy =
      attempts.length === 0
        ? 72
        : (attempts.filter((attempt) => attempt.status === "CORRECT").length / attempts.length) * 100;
    const avgTime = attempts.reduce((sum, attempt) => sum + attempt.timeTakenSec, 0) / Math.max(attempts.length, 1);
    const speed = Math.max(20, Math.min(100, 120 - avgTime));
    const focus =
      sessions.length === 0
        ? 76
        : sessions.reduce((sum, session) => sum + session.focusScore, 0) / sessions.length;
    const masteryScore =
      mastery.length === 0
        ? 58
        : mastery.reduce((sum, item) => sum + item.masteryScore, 0) / mastery.length;

    return {
      accuracy,
      speed,
      focus,
      consistency: Math.min(100, sessions.length * 8),
      masteryScore,
      learningVelocity: Math.round((accuracy + speed + masteryScore) / 3)
    };
  }
}

export class RuleBasedRecommendationProvider implements RecommendationProvider {
  async getRecommendations(userId: string) {
    const weak = await prisma.mastery.findFirst({
      where: { userId },
      include: { topic: { include: { subject: true } } },
      orderBy: { masteryScore: "asc" }
    });

    return [
      {
        kind: "topic" as const,
        title: weak ? `${weak.topic.name} sprint` : "Start with high-yield foundations",
        reason: weak ? `Mastery is ${Math.round(weak.masteryScore)}%. A short practice block will move it fastest.` : "No mastery signal yet. Begin with a diagnostic topic.",
        priority: "high" as const,
        href: "/quest"
      },
      {
        kind: "revision" as const,
        title: "15-minute spaced recall",
        reason: "Echo keeps memory warm before it fades.",
        priority: "medium" as const,
        href: "/vault"
      },
      {
        kind: "test" as const,
        title: "Adaptive mini mock",
        reason: "A 12-question set improves Pulse accuracy and speed estimates.",
        priority: "medium" as const,
        href: "/quest"
      }
    ];
  }
}

export class RuleBasedKnowledgeTracingProvider implements KnowledgeTracingProvider {
  async updateAfterAttempt(input: {
    userId: string;
    topicId: string;
    correct: boolean;
    timeTakenSec: number;
  }) {
    const existing = await prisma.mastery.findUnique({
      where: { userId_topicId: { userId: input.userId, topicId: input.topicId } }
    });
    const current = existing?.masteryScore ?? 40;
    const speedBonus = input.timeTakenSec < 90 ? 2 : -1;
    const delta = input.correct ? 6 + speedBonus : -5;
    const masteryScore = Math.max(0, Math.min(100, current + delta));
    const nextRevisionDays = masteryScore > 80 ? 15 : masteryScore > 60 ? 7 : input.correct ? 3 : 1;

    await prisma.mastery.upsert({
      where: { userId_topicId: { userId: input.userId, topicId: input.topicId } },
      update: {
        masteryScore,
        accuracy: input.correct ? Math.min(100, (existing?.accuracy ?? 55) + 4) : Math.max(0, (existing?.accuracy ?? 55) - 5),
        speedScore: Math.max(0, Math.min(100, 120 - input.timeTakenSec)),
        learningVelocity: delta,
        lastPracticedAt: new Date()
      },
      create: {
        userId: input.userId,
        topicId: input.topicId,
        masteryScore,
        accuracy: input.correct ? 70 : 35,
        speedScore: Math.max(0, Math.min(100, 120 - input.timeTakenSec)),
        learningVelocity: delta,
        lastPracticedAt: new Date()
      }
    });

    return { masteryScore, nextRevisionDays };
  }
}

export const studentModelProvider = new RuleBasedStudentModelProvider();
export const recommendationProvider = new RuleBasedRecommendationProvider();
export const knowledgeTracingProvider = new RuleBasedKnowledgeTracingProvider();
