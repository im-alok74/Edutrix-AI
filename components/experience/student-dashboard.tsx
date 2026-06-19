"use client";

import Link from "next/link";
import { BookOpen, Bot, CalendarDays, Flame, Headphones, NotebookPen, Quote, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    <div className="space-y-6">
      <section className="hero-gradient relative overflow-hidden rounded-[2rem] p-5 shadow-2xl sm:p-8">
        <motion.div
          className="absolute right-[-4rem] top-[-4rem] h-44 w-44 rounded-full bg-white/35 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/55 px-3 py-1 text-xs font-black text-foreground shadow-sm">Current Streak 🔥 12 days</span>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-foreground sm:text-6xl">Good Evening, Alok 👋</h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-foreground/75">
              You are closer than it feels. One clean study block tonight can move Electrostatics from shaky to solid.
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-[1.5rem] bg-white/55 p-4">
              <Quote className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm font-medium leading-6 text-foreground/80">Small wins compound. Finish one clean block and let the momentum carry tomorrow.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/focus-flow">
                  <Sparkles className="h-4 w-4" />
                  Start today&apos;s quest
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-white/55">
                <Link href="/nova">
                  <Bot className="h-4 w-4" />
                  Ask Nova
                </Link>
              </Button>
            </div>
          </div>
          <div className="premium-card mx-auto rounded-[2rem] p-4">
            <ProgressRing value={78} label="Ready" />
          </div>
        </div>
      </section>

      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
        {quickCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="premium-card min-w-[82%] snap-center rounded-[1.75rem] p-5 sm:min-w-0"
          >
            <card.icon className="h-7 w-7 text-primary" />
            <h2 className="mt-4 text-xl font-black">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.body}</p>
            <Link href={card.href} className="mt-4 inline-flex text-sm font-black text-primary">Open</Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="premium-card rounded-[2rem] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-primary">Today&apos;s Orbit</p>
              <h2 className="text-2xl font-black">Your evening path</h2>
            </div>
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <div className="mt-5 space-y-3">
            {orbit.map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-[1.25rem] bg-white/52 p-3">
                <span className="text-sm font-black text-muted-foreground">{item.time}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${item.tone}`}>{item.title}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="premium-card rounded-[2rem] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-primary">Recommended Topic</p>
              <h2 className="text-2xl font-black">Capacitors and Energy</h2>
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
          <div className="mt-5 rounded-[1.5rem] bg-white/55 p-4">
            <p className="text-sm font-black text-primary">Upcoming Revision</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">Revisit electrostatics formulas before your next deep block.</p>
          </div>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="premium-card rounded-[2rem] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">Readiness Glow</h2>
            <Trophy className="h-6 w-6 text-accent" />
          </div>
          <MasteryGlowChart />
        </section>
        <section className="premium-card rounded-[2rem] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black">Spark XP</h2>
            <Flame className="h-6 w-6 text-accent" />
          </div>
          <div className="mt-5 rounded-[1.5rem] bg-white/50 p-4">
            <div className="flex items-center justify-between text-sm font-black">
              <span>Level 8</span>
              <span>3,240 / 4,000 XP</span>
            </div>
            <Progress value={81} className="mt-3 h-4" />
          </div>
          <StudyHoursBars />
        </section>
      </div>

      <section className="premium-card rounded-[2rem] p-5">
        <h2 className="text-2xl font-black">Your Learning Universe</h2>
        <p className="mt-2 text-sm text-muted-foreground">Explore all the powerful modules at your fingertips</p>
        <div className="mt-5">
          <ModuleGrid />
        </div>
      </section>
    </div>
  );
}
