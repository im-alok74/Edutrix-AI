"use client";

import { motion } from "framer-motion";

export function ProgressRing({ value, label }: { value: number; label: string }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative grid h-32 w-32 place-items-center">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(var(--surface),0.45)" strokeWidth="12" />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeLinecap="round"
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-black">{value}%</p>
        <p className="text-[11px] font-bold text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
