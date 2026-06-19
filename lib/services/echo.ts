import { prisma } from "@/lib/db";

const intervals = [1, 3, 7, 15, 30];

export async function scheduleSpacedRevision(input: {
  userId: string;
  title: string;
  topicId?: string;
  questionId?: string;
  strengthIndex?: number;
}) {
  const intervalDay = intervals[Math.min(input.strengthIndex ?? 0, intervals.length - 1)];
  const dueAt = new Date(Date.now() + intervalDay * 86_400_000);

  return prisma.revisionQueue.create({
    data: {
      userId: input.userId,
      title: input.title,
      topicId: input.topicId,
      questionId: input.questionId,
      intervalDay,
      dueAt
    }
  });
}
