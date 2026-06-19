import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const modules = [
  ["Aura", "Student profile and identity engine", "/aura"],
  ["Nova", "AI personal study assistant", "/nova"],
  ["Orbit", "Study planner and timetable", "/orbit"],
  ["Quest", "Question and testing engine", "/quest"],
  ["Compass", "Recommendations for next best action", "/dashboard"],
  ["Pulse", "Accuracy, speed, focus, consistency", "/horizon"],
  ["Echo", "Spaced repetition revision engine", "/vault"],
  ["Spark", "XP, levels, badges, streaks", "/dashboard"],
  ["Nexus", "Learning event data collection", "/dashboard"]
];

export function ModuleGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {modules.map(([name, description, href]) => (
        <Link key={name} href={href}>
          <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-glow">
            <CardContent className="flex h-full items-start justify-between gap-4 p-4">
              <div>
                <p className="font-black">{name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-indigo-500" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
