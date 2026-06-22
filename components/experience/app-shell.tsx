"use client";

import Link from "next/link";
import { UserMenu } from "@/components/auth/user-menu";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Bot,
  CalendarDays,
  ChartNoAxesCombined,
  Flame,
  Home,
  NotebookTabs,
  Settings,
  Timer,
  UserRound
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Home", description: "Overview", icon: Home },
  { href: "/aura", label: "Aura", description: "Profile", icon: UserRound },
  { href: "/orbit", label: "Orbit", description: "Plan", icon: CalendarDays },
  { href: "/quest", label: "Quest", description: "Practice", icon: BookOpen },
  { href: "/horizon", label: "Stats", description: "Progress", icon: ChartNoAxesCombined },
  { href: "/vault", label: "Vault", description: "Review", icon: NotebookTabs },
  { href: "/spark", label: "Spark", description: "XP", icon: Flame },
  { href: "/focus-flow", label: "Focus", description: "Deep work", icon: Timer },
  { href: "/settings", label: "Settings", description: "Prefs", icon: Settings }
];

const mobileNav = nav.slice(0, 4);

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <aside className="fixed inset-y-4 left-4 z-20 hidden w-72 rounded-[2rem] border bg-[rgba(var(--nav),0.72)] p-4 shadow-2xl backdrop-blur-2xl xl:block">
        <Link href="/dashboard" className="flex items-center gap-3 rounded-[1.5rem] p-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-lg font-black text-primary-foreground shadow-lg">E</span>
          <span>
            <span className="block text-xl font-black">EduTrix</span>
            <span className="text-xs font-semibold text-muted-foreground">Your learning universe</span>
          </span>
        </Link>
        <nav className="mt-5 grid gap-1.5">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex min-h-14 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition",
                  active ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="flex flex-col leading-none">
                  <span>{item.label}</span>
                  <span className="mt-1 text-[11px] font-semibold leading-none opacity-80">{item.description}</span>
                </span>
                {active && <motion.span layoutId="rail-glow" className="absolute inset-0 -z-10 rounded-2xl bg-primary" />}
              </Link>
            );
          })}
        </nav>
      </aside>

      <header className="sticky top-0 z-10 px-4 pt-3 xl:ml-80">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border bg-[rgba(var(--nav),0.68)] px-3 py-2 shadow-lg backdrop-blur-2xl">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-black text-primary-foreground">E</span>
            <span>
              <span className="block text-sm font-black leading-none">EduTrix</span>
              <span className="text-[11px] font-semibold text-muted-foreground">Student OS</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/settings" className="touch-target grid place-items-center rounded-full bg-white/55 text-muted-foreground shadow-sm" aria-label="Open settings">
              <Settings className="h-5 w-5" />
            </Link>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="px-4 pb-28 pt-5 xl:ml-80">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: "easeOut" }}
          className="mx-auto max-w-6xl"
        >
          {children}
        </motion.div>
      </main>

      <Link
        href="/nova"
        className="fixed bottom-24 right-4 z-40 grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/30 xl:bottom-8 xl:right-8"
        aria-label="Open Nova AI mentor"
      >
        <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-primary/30" />
        <Bot className="relative h-7 w-7" />
      </Link>

      <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-[1.75rem] border bg-[rgba(var(--nav),0.86)] p-2 shadow-2xl backdrop-blur-2xl xl:hidden">
        {mobileNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-black", active ? "text-primary" : "text-muted-foreground")}>
              {active && <motion.span layoutId="mobile-pill" className="absolute inset-0 rounded-2xl bg-primary/12" />}
              <item.icon className="relative h-5 w-5" />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
        <Link href="/nova" className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl bg-primary text-[11px] font-black text-primary-foreground">
          <Bot className="h-5 w-5" />
          Nova
        </Link>
      </nav>
    </div>
  );
}
