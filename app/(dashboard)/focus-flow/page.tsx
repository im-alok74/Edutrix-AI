import { Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FocusFlowPage() {
  return (
    <div className="grid min-h-[76vh] place-items-center">
      <section className="hero-gradient w-full max-w-3xl rounded-[2.5rem] p-6 text-center shadow-2xl sm:p-10">
        <p className="text-sm font-black text-foreground/70">FocusFlow</p>
        <h1 className="mt-2 text-4xl font-black sm:text-6xl">No distractions. Just the next 25 minutes.</h1>
        <div className="mx-auto mt-8 grid aspect-square max-w-72 place-items-center rounded-full border-[14px] border-white/50 bg-white/45 shadow-2xl backdrop-blur">
          <span className="text-6xl font-black">25:00</span>
        </div>
        <p className="mt-6 text-sm font-bold text-foreground/70">Current goal: Capacitors and Energy revision</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="rounded-full">
            <Timer className="h-4 w-4" />
            Start focus
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-white/55">Background sounds</Button>
          <Button size="lg" variant="outline" className="rounded-full bg-white/55">Log distraction</Button>
        </div>
      </section>
    </div>
  );
}
