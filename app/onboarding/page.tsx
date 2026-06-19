"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, PartyPopper, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const steps = ["Welcome", "Choose Exam", "Target Rank", "Weak Subjects", "Strong Subjects", "Study Hours", "Journey"];
const exams = ["GATE", "JEE", "NEET", "CUET", "UPSC"];
const subjects = ["Physics", "Chemistry", "Mathematics", "Biology", "Aptitude", "Current Affairs"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  function next() {
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.16),transparent_30rem)] px-4 py-4 sm:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-2xl flex-col">
        <header className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 font-black">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">E</span>
            EduTrix
          </Link>
          <Badge variant="secondary">{progress}%</Badge>
        </header>

        <div className="mt-6 rounded-[1.75rem] bg-white/70 p-4 shadow-lg shadow-primary/5 backdrop-blur">
          <Progress value={progress} className="h-3" />
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">{steps[step]}</p>
            <span className="text-xs font-semibold text-muted-foreground">
              Step {step + 1} of {steps.length}
            </span>
          </div>
        </div>

        <section className="grid flex-1 place-items-center py-6 sm:py-8">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full"
          >
            <Card className="border-white/60 bg-white/80 shadow-2xl shadow-primary/10 backdrop-blur">
              <CardContent className="p-5 sm:p-6">
                {step === 0 && (
                  <div className="text-center">
                    <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mx-auto grid h-24 w-24 place-items-center rounded-[2rem] bg-primary/12 text-primary">
                      <Sparkles className="h-12 w-12" />
                    </motion.div>
                    <h1 className="mt-6 text-3xl font-black sm:text-4xl">Let&apos;s build your learning universe.</h1>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">EduTrix adapts around your exam, weak spots, energy, and goals.</p>
                    <Separator className="my-6 bg-slate-200/80" />
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        ["Personal", "Your profile, your pace"],
                        ["Adaptive", "Weakness-aware guidance"],
                        ["Daily", "A plan you can keep"]
                      ].map(([title, description]) => (
                        <div key={title} className="rounded-[1.25rem] bg-slate-50 p-4 text-left">
                          <div className="text-sm font-black text-slate-900">{title}</div>
                          <p className="mt-2 text-xs leading-6 text-slate-600">{description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && <ChoiceStep title="Which exam are you preparing for?" options={exams} />}

                {step === 2 && (
                  <div>
                    <h1 className="text-3xl font-black">What rank are we chasing?</h1>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">A target helps us shape the study pace and revision rhythm.</p>
                    <input className="mt-6 h-16 w-full rounded-[1.25rem] border bg-white/80 px-5 text-2xl font-black outline-none focus:ring-2 focus:ring-ring" placeholder="500" />
                  </div>
                )}

                {step === 3 && <ChoiceStep title="Where should Nova be extra patient?" options={subjects} multi />}
                {step === 4 && <ChoiceStep title="What already feels strong?" options={subjects} multi />}

                {step === 5 && (
                  <div>
                    <h1 className="text-3xl font-black">Daily study hours</h1>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Choose a goal that feels ambitious but realistic.</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {[
                        "1-2",
                        "2-4",
                        "4-6",
                        "6+"
                      ].map((hours) => (
                        <button key={hours} className="touch-target rounded-[1.4rem] border bg-white/80 p-5 text-2xl font-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                          {hours}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="text-center">
                    <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-secondary text-secondary-foreground">
                      <PartyPopper className="h-14 w-14" />
                    </motion.div>
                    <h1 className="mt-6 text-3xl font-black sm:text-4xl">Your journey is ready.</h1>
                    <p className="mt-3 text-base leading-7 text-muted-foreground">Aura, Nova, Orbit, Pulse, and Spark are now tuned for you.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {[
                        ["Nova", "AI mentor tuned"],
                        ["Orbit", "Study rhythm created"]
                      ].map(([name, description]) => (
                        <div key={name} className="rounded-[1.25rem] bg-slate-50 p-4 text-left">
                          <div className="text-sm font-black text-slate-900">{name}</div>
                          <p className="mt-2 text-xs leading-6 text-slate-600">{description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <footer className="grid gap-3 pb-2">
          {step < steps.length - 1 ? (
            <Button onClick={next} size="lg" className="rounded-full shadow-lg shadow-primary/20">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20">
              <Link href="/dashboard">
                Enter EduTrix <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </footer>
      </div>
    </main>
  );
}

function ChoiceStep({ title, options, multi = false }: { title: string; options: string[]; multi?: boolean }) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(option: string) {
    setSelected((current) => (multi ? (current.includes(option) ? current.filter((item) => item !== option) : [...current, option]) : [option]));
  }

  return (
    <div>
      <h1 className="text-3xl font-black">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">Tap one or more options to shape a personalized study journey.</p>
      <div className="mt-6 grid gap-3">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggle(option)}
              className={active ? "touch-target flex items-center justify-between rounded-[1.4rem] bg-primary p-4 text-left font-black text-primary-foreground shadow-lg" : "touch-target flex items-center justify-between rounded-[1.4rem] border bg-white/80 p-4 text-left font-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"}
            >
              <span>{option}</span>
              {active && <Check className="h-5 w-5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
