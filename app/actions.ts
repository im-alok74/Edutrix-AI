"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { trackEvent } from "@/lib/services/nexus";

export async function saveAuraProfile(formData: FormData) {
  const user = await requireUser();
  const weakSubjects = String(formData.get("weakSubjects") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const strongSubjects = String(formData.get("strongSubjects") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      exam: formData.get("exam") as never,
      targetRank: Number(formData.get("targetRank") || 0) || null,
      dailyStudyHours: Number(formData.get("dailyStudyHours") || 2),
      weakSubjects,
      strongSubjects,
      learningStyle: String(formData.get("learningStyle") ?? "mixed")
    }
  });

  await trackEvent({
    userId: user.id,
    eventType: "aura.profile_updated",
    eventData: { weakSubjects, strongSubjects }
  });
  revalidatePath("/dashboard");
}

export async function createTimetableItem(formData: FormData) {
  const user = await requireUser();
  const startsAt = new Date(String(formData.get("startsAt")));
  const durationMin = Number(formData.get("durationMin") || 60);

  await prisma.timetableItem.create({
    data: {
      userId: user.id,
      title: String(formData.get("title")),
      type: formData.get("type") as never,
      subject: String(formData.get("subject") ?? ""),
      topic: String(formData.get("topic") ?? ""),
      startsAt,
      endsAt: new Date(startsAt.getTime() + durationMin * 60_000)
    }
  });

  await trackEvent({
    userId: user.id,
    eventType: "orbit.item_created",
    eventData: { title: String(formData.get("title")), durationMin }
  });
  revalidatePath("/orbit");
}

export async function createGoal(formData: FormData) {
  const user = await requireUser();
  await prisma.goal.create({
    data: {
      userId: user.id,
      title: String(formData.get("title")),
      period: formData.get("period") as never,
      target: Number(formData.get("target")),
      metric: String(formData.get("metric") ?? "hours"),
      startsAt: new Date(String(formData.get("startsAt"))),
      endsAt: new Date(String(formData.get("endsAt")))
    }
  });
  await trackEvent({ userId: user.id, eventType: "atlas.goal_created", eventData: { title: String(formData.get("title")) } });
  revalidatePath("/dashboard");
}

export async function addJournalEntry(formData: FormData) {
  const user = await requireUser();
  await prisma.journalEntry.create({
    data: {
      userId: user.id,
      reflection: String(formData.get("reflection")),
      learnings: String(formData.get("learnings") ?? ""),
      challenges: String(formData.get("challenges") ?? ""),
      notes: String(formData.get("notes") ?? "")
    }
  });
  await trackEvent({ userId: user.id, eventType: "chronicle.entry_created", eventData: {} });
  revalidatePath("/dashboard");
}

export async function logMood(formData: FormData) {
  const user = await requireUser();
  const mood = formData.get("mood") as never;
  await prisma.moodLog.create({ data: { userId: user.id, mood, note: String(formData.get("note") ?? "") } });
  await trackEvent({ userId: user.id, eventType: "moodsphere.checkin", eventData: { mood } });
  revalidatePath("/dashboard");
}
