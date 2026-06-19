"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, PartyPopper, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const steps = [
  "Welcome",
  "Choose Exam",
  "Target Rank",
  "Weak Subjects",
  "Strong Subjects",
  "Study Hours",
  "Journey"
];

const exams = ["GATE", "JEE", "NEET", "CUET", "UPSC"];
const subjects = ["Physics", "Chemistry", "Mathematics", "Biology", "Aptitude", "Current Affairs"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  function next() {
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  return (
    <main className="min-h-screen px-4 py-5">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-xl flex-col">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">E</span>
            EduTrix
          </Link>
          <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-black text-muted-foreground">{progress}%</span>
        </header>

        <div className="mt-6">
          <Progress value={progress} className="h-3" />
          <p className="mt-3 text-xs font-black uppercase text-primary">{steps[step]}</p>
        </div>

        <section className="grid flex-1 place-items-center py-8">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="premium-card w-full rounded-[2.25rem] p-6"
          >
            {step === 0 && (
              <div className="text-center">
                <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mx-auto grid h-24 w-24 place-items-center rounded-[2rem] bg-primary/12 text-primary">
                  <Sparkles className="h-12 w-12" />
                </motion.div>
                <h1 className="mt-6 text-4xl font-black">Let&apos;s build your learning universe.</h1>
                <p className="mt-3 text-base leading-7 text-muted-foreground">EduTrix adapts around your exam, weak spots, energy, and goals.</p>
              </div>
            )}

            {step === 1 && (
              <ChoiceStep title="Which exam are you preparing for?" options={exams} />
            )}
            {step === 2 && (
              <div>
                <h1 className="text-3xl font-black">What rank are we chasing?</h1>
                <input className="mt-6 h-16 w-full rounded-[1.25rem] border bg-white/70 px-5 text-2xl font-black outline-none focus:ring-2 focus:ring-ring" placeholder="500" />
              </div>
            )}
            {step === 3 && <ChoiceStep title="Where should Nova be extra patient?" options={subjects} multi />}
            {step === 4 && <ChoiceStep title="What already feels strong?" options={subjects} multi />}
            {step === 5 && (
              <div>
                <h1 className="text-3xl font-black">Daily study hours</h1>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {["1-2", "2-4", "4-6", "6+"].map((hours) => (
                    <button key={hours} className="touch-target rounded-[1.4rem] bg-white/70 p-5 text-2xl font-black shadow-sm">{hours}</button>
                  ))}
                </div>
              </div>
            )}
            {step === 6 && (
              <div className="text-center">
                <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-secondary text-secondary-foreground">
                  <PartyPopper className="h-14 w-14" />
                </motion.div>
                <h1 className="mt-6 text-4xl font-black">Your journey is ready.</h1>
                <p className="mt-3 text-base leading-7 text-muted-foreground">Aura, Nova, Orbit, Pulse, and Spark are now tuned for you.</p>
              </div>
            )}
          </motion.div>
        </section>

        <footer className="grid gap-3 pb-2">
          {step < steps.length - 1 ? (
            <Button onClick={next} size="lg" className="rounded-full">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button asChild size="lg" className="rounded-full">
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
      <div className="mt-6 grid gap-3">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button key={option} onClick={() => toggle(option)} className={active ? "touch-target flex items-center justify-between rounded-[1.4rem] bg-primary p-4 text-left font-black text-primary-foreground shadow-lg" : "touch-target flex items-center justify-between rounded-[1.4rem] bg-white/70 p-4 text-left font-black shadow-sm"}>
              {option}
              {active && <Check className="h-5 w-5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
