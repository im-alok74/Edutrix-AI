"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_32rem),radial-gradient(circle_at_top_right,rgba(45,212,191,0.14),transparent_28rem)]">
      <section className="relative">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.12))]" />
        <div className="relative mx-auto grid min-h-screen w-full max-w-6xl gap-6 px-4 py-6 sm:px-5 sm:py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <Badge>student-first</Badge>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                EduTrix feels like a daily study companion.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-700 sm:text-xl">
                A beautiful student experience for GATE, JEE, NEET, CUET, and school prep. Organize your day, hear from Nova, and keep your momentum visible.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {!session ? (
                <>
                  <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20">
                    <Link href="/auth/signin">
                      Start learning <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full bg-white/70">
                    <Link href="/onboarding">Preview onboarding</Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20">
                  <Link href="/dashboard">
                    Open dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "12", label: "day streak" },
                { value: "78%", label: "readiness" },
                { value: "3", label: "revisions today" }
              ].map((item) => (
                <Card key={item.label} className="border-white/60 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="text-3xl font-black text-slate-950">{item.value}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Aura", "Your profile and study rhythm"],
                ["Nova", "Instant help that feels alive"],
                ["Orbit", "A plan that fits your day"]
              ].map(([name, description]) => (
                <Card key={name} className="border-white/70 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="text-sm font-black text-slate-900">{name}</div>
                    <p className="mt-2 text-xs leading-6 text-slate-600">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="border-white/60 bg-white/80 shadow-2xl shadow-primary/10 backdrop-blur">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Badge variant="secondary">Today&apos;s Orbit</Badge>
                    <h2 className="mt-3 text-2xl font-black text-slate-950">Your day, shaped cleanly.</h2>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
                <Separator className="my-5 bg-slate-200/80" />
                <div className="space-y-3">
                  {[
                    ["6:30 PM", "Physics: Capacitors"],
                    ["7:45 PM", "15 PYQs"],
                    ["9:00 PM", "Echo revision"]
                  ].map(([time, title]) => (
                    <div key={title} className="flex items-center justify-between rounded-[1.25rem] bg-slate-50 px-4 py-3">
                      <span className="text-sm font-black text-slate-600">{time}</span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">{title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-white/60 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardContent className="p-5">
                  <div className="text-sm font-black uppercase tracking-[0.18em] text-slate-600">Readiness</div>
                  <p className="mt-3 text-3xl font-black text-slate-950">78%</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">You are in a strong spot for tonight&apos;s block.</p>
                </CardContent>
              </Card>
              <Card className="border-white/60 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardContent className="p-5">
                  <div className="text-sm font-black uppercase tracking-[0.18em] text-slate-600">Feeling</div>
                  <p className="mt-3 text-3xl font-black text-slate-950">Calm</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">A softer workspace that students want to reopen tomorrow.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
