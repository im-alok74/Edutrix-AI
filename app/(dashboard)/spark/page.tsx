import { Award, Flame, Gem, PartyPopper, Trophy, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const badges = [
  { title: "7-Day Fire", icon: Flame, unlocked: true },
  { title: "PYQ Crusher", icon: Trophy, unlocked: true },
  { title: "Deep Focus", icon: Zap, unlocked: false },
  { title: "Comeback Win", icon: Gem, unlocked: false }
];

export default function SparkPage() {
  return (
    <div className="space-y-6">
      <section className="hero-gradient rounded-[2rem] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black text-foreground/70">Spark Motivation Engine</p>
            <h1 className="mt-2 text-4xl font-black">Level 8 Scholar</h1>
            <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-foreground/70">Earn XP by studying, revising, solving, journaling, and staying consistent.</p>
          </div>
          <div className="grid h-20 w-20 place-items-center rounded-[1.5rem] bg-white/55">
            <PartyPopper className="h-10 w-10 text-primary" />
          </div>
        </div>
        <div className="mt-6 rounded-[1.5rem] bg-white/55 p-4">
          <div className="flex justify-between text-sm font-black">
            <span>3,240 XP</span>
            <span>760 XP to Level 9</span>
          </div>
          <Progress value={81} className="mt-3 h-4" />
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((badge) => (
          <section key={badge.title} className={badge.unlocked ? "premium-card rounded-[1.75rem] p-5" : "rounded-[1.75rem] border bg-white/35 p-5 opacity-70"}>
            <div className="grid h-16 w-16 place-items-center rounded-[1.25rem] bg-primary/12 text-primary">
              <badge.icon className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-lg font-black">{badge.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{badge.unlocked ? "Unlocked" : "Keep going"}</p>
          </section>
        ))}
      </div>

      <section className="premium-card rounded-[2rem] p-6">
        <div className="flex items-center gap-3">
          <Award className="h-7 w-7 text-accent" />
          <h2 className="text-2xl font-black">Next Milestone</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Complete two FocusFlow sessions and one Echo revision today to unlock Deep Focus.</p>
      </section>
    </div>
  );
}
