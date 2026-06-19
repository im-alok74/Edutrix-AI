import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { askNova } from "@/lib/ai/gemini";
import { prisma } from "@/lib/db";
import { studentModelProvider } from "@/lib/athena/rule-based";
import { trackEvent } from "@/lib/services/nexus";

export async function POST(request: Request) {
  const user = await requireUser();
  const { message } = (await request.json()) as { message?: string };
  if (!message?.trim()) return NextResponse.json({ error: "Message is required" }, { status: 400 });

  const history = await prisma.chatMessage.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 12
  });
  const profile = await studentModelProvider.getProfile(user.id);

  await prisma.chatMessage.create({ data: { userId: user.id, role: "user", content: message } });
  const response = await askNova({
    message,
    profile,
    history: history.reverse().map((turn) => ({ role: turn.role as "user" | "assistant", content: turn.content }))
  });
  const assistantMessage = await prisma.chatMessage.create({
    data: { userId: user.id, role: "assistant", content: response }
  });

  await trackEvent({
    userId: user.id,
    eventType: "nova.chat_message",
    eventData: { length: message.length, assistantMessageId: assistantMessage.id }
  });

  return NextResponse.json({ message: assistantMessage });
}
