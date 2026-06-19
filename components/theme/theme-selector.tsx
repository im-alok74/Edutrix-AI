"use client";

import { Check } from "lucide-react";
import { useEduTrixTheme, type EduTrixTheme } from "@/components/theme/theme-provider";
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
    <div className="grid gap-3 sm:grid-cols-2">
      {themes.map((item) => {
        const meta = themeMeta[item];
        const active = theme === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => setTheme(item)}
            className={cn(
              "touch-target rounded-[1.5rem] border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "border-primary bg-white/85 shadow-xl" : "bg-white/55"
            )}
          >
            <span className={cn("block h-24 rounded-[1.25rem] bg-gradient-to-br", meta.gradient)} />
            <span className="mt-3 flex items-center justify-between gap-3">
              <span>
                <span className="block text-base font-black">{meta.label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{meta.description}</span>
              </span>
              {active && (
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
