import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { trackEvent } from "@/lib/services/nexus";

export async function POST(request: Request) {
  const user = await requireUser();
  const { token, platform = "web" } = (await request.json()) as { token?: string; platform?: string };
  if (!token) return NextResponse.json({ error: "token is required" }, { status: 400 });

  await prisma.deviceToken.upsert({
    where: { token },
    update: { userId: user.id, platform },
    create: { userId: user.id, token, platform }
  });

  await trackEvent({ userId: user.id, eventType: "beacon.device_subscribed", eventData: { platform } });
  return NextResponse.json({ ok: true });
}
