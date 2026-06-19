import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative flex min-h-screen items-center bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,251,241,0.96),rgba(255,251,241,0.76),rgba(255,251,241,0.2))]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-5 py-10">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-medium text-indigo-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Your Personal Learning Universe
            </div>
            <h1 className="text-5xl font-black leading-tight text-slate-950 sm:text-7xl">EduTrix</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
              A joyful, adaptive study operating system for GATE, JEE, NEET, CUET, and school exam preparation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button size="lg" className="rounded-full">
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
          </div>
          <div className="grid max-w-3xl grid-cols-2 gap-3 pt-10 sm:grid-cols-4">
            {["Aura", "Nova", "Orbit", "Pulse"].map((item) => (
              <div key={item} className="glass rounded-[1.5rem] border p-4 text-sm font-bold text-slate-800 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
