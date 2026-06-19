import { prisma } from "@/lib/db";
import { recommendationProvider, studentModelProvider } from "@/lib/athena/rule-based";
import type { DashboardSnapshot } from "@/types/domain";

export async function getDashboardSnapshot(userId: string): Promise<DashboardSnapshot> {
  const [user, pulse, recommendations, sessions, attempts, revision] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId } }),
    studentModelProvider.getPulse(userId),
    recommendationProvider.getRecommendations(userId),
    prisma.studySession.findMany({ where: { userId }, orderBy: { startedAt: "desc" }, take: 7 }),
    prisma.attempt.count({ where: { userId } }),
    prisma.revisionQueue.findFirst({ where: { userId, completedAt: null }, orderBy: { dueAt: "asc" } })
  ]);

  const studyHoursToday = sessions
    .filter((session) => session.startedAt.toDateString() === new Date().toDateString())
    .reduce((sum, session) => sum + session.durationMin / 60, 0);

  return {
    greetingName: user.name.split(" ")[0] ?? "Learner",
    streak: user.streak,
    studyHoursToday,
    readinessScore: pulse.masteryScore,
    recommendedTopic: recommendations[0]?.title ?? "Diagnostic practice",
    upcomingRevision: revision?.title ?? "No pending revision",
    questionsSolved: attempts,
    accuracy: pulse.accuracy,
    weeklyGrowth: pulse.learningVelocity
  };
}
