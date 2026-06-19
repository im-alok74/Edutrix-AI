import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

type EventInput = {
  userId: string;
  eventType: string;
  eventData: Record<string, unknown>;
  goalId?: string;
};

export async function trackEvent(input: EventInput) {
  return prisma.event.create({
    data: {
      userId: input.userId,
      goalId: input.goalId,
      eventType: input.eventType,
      eventData: input.eventData as Prisma.InputJsonValue
    }
  });
}
