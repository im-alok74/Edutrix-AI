"use client";

import Link from "next/link";
import { BookOpen, Bot, CalendarDays, Flame, Headphones, NotebookPen, Quote, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/experience/progress-ring";
import { MasteryGlowChart, StudyHoursBars } from "@/components/experience/premium-chart";
import { ModuleGrid } from "@/components/modules/module-grid";

const orbit = [
  { time: "6:30 PM", title: "Physics: Capacitors", tone: "bg-primary/12 text-primary" },
  { time: "7:45 PM", title: "15 PYQs", tone: "bg-secondary/20 text-secondary-foreground" },
  { time: "9:00 PM", title: "Echo revision", tone: "bg-accent/20 text-accent-foreground" }
];

const quickCards = [
  { title: "Nova knows your weak spots", body: "Ask for a 20-minute recovery plan.", icon: Bot, href: "/nova" },
  { title: "Mistake Vault", body: "3 questions are ready for review.", icon: NotebookPen, href: "/vault" },
  { title: "Deep Focus", body: "Start a distraction-free session.", icon: Headphones, href: "/focus-flow" }
];

export function StudentDashboard() {
  return (
    <div className="space-y-6 pb-4">
      <section className="hero-gradient relative overflow-hidden rounded-[2.25rem] p-5 shadow-2xl sm:p-8">
        <motion.div
          className="absolute right-[-4rem] top-[-4rem] h-44 w-44 rounded-full bg-white/35 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <Badge variant="secondary">Good Evening</Badge>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-foreground sm:text-6xl">Good Evening, Alok 👋</h1>
            <p className="max-w-2xl text-base font-medium leading-7 text-foreground/75 sm:text-lg">
              You are closer than it feels. One clean study block tonight can move Electrostatics from shaky to solid.
            </p>
            <Card className="border-white/40 bg-white/45 shadow-xl shadow-primary/10 backdrop-blur">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <Quote className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm font-medium leading-6 text-foreground/80 sm:text-base">Small wins compound. Finish one clean block and let the momentum carry tomorrow.</p>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20">
                <Link href="/focus-flow">
                  <Sparkles className="h-4 w-4" />
                  Start today&apos;s quest
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-white/65">
                <Link href="/nova">
                  <Bot className="h-4 w-4" />
                  Ask Nova
                </Link>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["12 day", "streak"],
                ["78%", "readiness"],
                ["3", "revisions"]
              ].map(([value, label]) => (
                <Card key={label} className="border-white/40 bg-white/45 shadow-lg shadow-primary/5 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="text-2xl font-black text-foreground">{value}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">{label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-white/40 bg-white/50 shadow-2xl shadow-primary/10 backdrop-blur">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Badge>Readiness score</Badge>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-foreground/60">Ready for tonight&apos;s block</p>
                </div>
                <ProgressRing value={78} label="Ready" />
              </div>
              <Separator className="my-5 bg-white/60" />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] bg-white/55 p-4">
                  <p className="text-sm font-black text-primary">Upcoming revision</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/75">Capacitors and energy before your next deep block.</p>
                </div>
                <div className="rounded-[1.25rem] bg-white/55 p-4">
                  <p className="text-sm font-black text-primary">Mood</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/75">Focused, calm, and ready to move.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
        {quickCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="min-w-[82%] snap-center sm:min-w-0"
          >
            <Card className="h-full border-white/50 bg-white/70 shadow-xl shadow-primary/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-2xl">
              <CardContent className="p-5">
                <card.icon className="h-7 w-7 text-primary" />
                <h2 className="mt-4 text-xl font-black text-foreground">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p>
                <Link href={card.href} className="mt-4 inline-flex text-sm font-black text-primary">Open</Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <Badge variant="secondary">Today&apos;s Orbit</Badge>
                <h2 className="mt-3 text-2xl font-black text-foreground">Your evening path</h2>
              </div>
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <div className="mt-5 space-y-3">
              {orbit.map((item) => (
                <div key={item.title} className="flex items-center justify-between gap-3 rounded-[1.25rem] bg-white/70 p-3">
                  <span className="text-sm font-black text-muted-foreground">{item.time}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${item.tone}`}>{item.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <Badge>Recommended Topic</Badge>
                <h2 className="mt-3 text-2xl font-black text-foreground">Capacitors and Energy</h2>
              </div>
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Nova picked this because your speed is improving but conceptual accuracy dipped in the last mock.</p>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm font-bold">
                <span>Mastery</span>
                <span>64%</span>
              </div>
              <Progress value={64} className="h-4" />
            </div>
            <div className="mt-5 rounded-[1.5rem] bg-white/70 p-4">
              <p className="text-sm font-black text-primary">Upcoming Revision</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Revisit electrostatics formulas before your next deep block.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-foreground">Readiness Glow</h2>
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <div className="mt-4">
              <MasteryGlowChart />
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-foreground">Spark XP</h2>
              <Flame className="h-6 w-6 text-accent" />
            </div>
            <div className="mt-5 rounded-[1.5rem] bg-white/70 p-4">
              <div className="flex items-center justify-between text-sm font-black">
                <span>Level 8</span>
                <span>3,240 / 4,000 XP</span>
              </div>
              <Progress value={81} className="mt-3 h-4" />
            </div>
            <div className="mt-4">
              <StudyHoursBars />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Badge variant="secondary">Your Learning Universe</Badge>
              <h2 className="mt-3 text-2xl font-black text-foreground">Explore your modules.</h2>
            </div>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Quick access to Aura, Nova, Orbit, Quest, Compass, Pulse, Echo, Spark, and Nexus.</p>
          <div className="mt-5">
            <ModuleGrid />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
