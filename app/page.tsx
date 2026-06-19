import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,251,241,0.98),rgba(255,251,241,0.82),rgba(255,251,241,0.35))]" />
        <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-6 sm:px-5 sm:py-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-medium text-indigo-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Your Personal Learning Universe
            </div>
            <h1 className="max-w-xl text-5xl font-black leading-tight text-slate-950 sm:text-6xl lg:text-7xl">EduTrix</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700 sm:text-xl">
              A joyful, adaptive study operating system for GATE, JEE, NEET, CUET, and school exam preparation.
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg" className="rounded-full shadow-lg shadow-primary/20">
                    Start learning <ArrowRight className="h-4 w-4" />
                  </Button>
                </SignInButton>
                <Button asChild variant="outline" size="lg" className="rounded-full bg-white/60">
                  <Link href="/onboarding">Preview onboarding</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/dashboard">
                    Open dashboard <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </SignedIn>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
              {[
                ["12 day", "streak"],
                ["78%", "readiness"],
                ["3", "revisions"]
              ].map(([value, label]) => (
                <div key={label} className="glass rounded-[1.5rem] border p-4 shadow-sm">
                  <div className="text-2xl font-black text-slate-950">{value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="glass rounded-[2rem] border p-5 shadow-xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700">Today&apos;s Orbit</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Aura", "Profile", "Personalized pace and goals"],
                  ["Nova", "Guide", "Instant doubt clearing"],
                  ["Orbit", "Plan", "Your day in clean blocks"],
                  ["Pulse", "Score", "Readiness, speed, consistency"]
                ].map(([name, tag, description]) => (
                  <div key={name} className="flex items-start justify-between gap-3 rounded-[1.25rem] bg-white/75 p-4">
                    <div>
                      <div className="text-sm font-black text-slate-900">{name}</div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{description}</p>
                    </div>
                    <span className="rounded-full bg-slate-900/5 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-slate-700">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-[2rem] border p-5 shadow-xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-700">Feeling</p>
              <p className="mt-3 text-2xl font-black leading-tight text-slate-950">Focused, calm, and ready to study.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">A soft, motivating workspace that helps students open the app every day.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
