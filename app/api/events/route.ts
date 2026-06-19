import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { trackEvent } from "@/lib/services/nexus";

export async function POST(request: Request) {
  const user = await requireUser();
  const body = (await request.json()) as { eventType?: string; eventData?: Record<string, unknown> };
  if (!body.eventType) return NextResponse.json({ error: "eventType is required" }, { status: 400 });
  const event = await trackEvent({
    userId: user.id,
    eventType: body.eventType,
    eventData: body.eventData ?? {}
  });
  return NextResponse.json({ event });
}
