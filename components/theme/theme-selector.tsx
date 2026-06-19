"use client";

import { Check } from "lucide-react";
import { useEduTrixTheme, type EduTrixTheme } from "@/components/theme/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const themeMeta: Record<EduTrixTheme, { label: string; gradient: string; description: string }> = {
  aurora: {
    label: "Aurora",
    gradient: "from-indigo-400 via-emerald-300 to-amber-200",
    description: "Soft indigo and mint for calm momentum."
  },
  midnight: {
    label: "Midnight",
    gradient: "from-violet-500 via-purple-700 to-slate-950",
    description: "Deep, focused, and cinematic."
  },
  forest: {
    label: "Forest",
    gradient: "from-emerald-500 via-lime-300 to-yellow-200",
    description: "Fresh energy for long study days."
  },
  solar: {
    label: "Solar",
    gradient: "from-orange-500 via-yellow-300 to-rose-300",
    description: "Bright, rewarding, and warm."
  },
  ocean: {
    label: "Ocean",
    gradient: "from-sky-500 via-cyan-300 to-indigo-300",
    description: "Clean clarity with cool focus."
  }
};

export function ThemeSelector() {
  const { theme, setTheme, themes } = useEduTrixTheme();

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {themes.map((item) => {
        const meta = themeMeta[item];
        const active = theme === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => setTheme(item)}
            className={cn("group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring")}
          >
            <Card className={cn("overflow-hidden border-white/50 shadow-lg shadow-primary/5 transition group-hover:-translate-y-0.5 group-hover:shadow-xl", active ? "ring-2 ring-primary" : "bg-white/70") }>
              <CardContent className="p-3">
                <div className={cn("h-24 rounded-[1.25rem] bg-gradient-to-br", meta.gradient)} />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-base font-black">{meta.label}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{meta.description}</p>
                  </div>
                  <span className={cn("grid h-9 w-9 place-items-center rounded-full", active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground") }>
                    <Check className={cn("h-4 w-4", active ? "opacity-100" : "opacity-0")} />
                  </span>
                </div>
                <Badge variant={active ? "default" : "outline"} className="mt-3">
                  {active ? "Active" : "Switch"}
                </Badge>
              </CardContent>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
