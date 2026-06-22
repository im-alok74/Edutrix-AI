"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  Award,
  BellRing,
  BookOpen,
  Building2,
  ChevronRight,
  Crown,
  Flame,
  Gift,
  Gem,
  GraduationCap,
  Lock,
  Medal,
  PartyPopper,
  PlayCircle,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Trophy,
  Users,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProgressRing } from "@/components/experience/progress-ring";
import { cn } from "@/lib/utils";
import {
  getSparkLevelMilestone,
  getSparkLevelTitle,
  getSparkProgress,
  sparkAchievements,
  sparkAnalytics,
  sparkChallenges,
  sparkJourney,
  sparkLeaderboards,
  sparkLevelMilestones,
  sparkNotifications,
  sparkProfile,
  sparkRetentionSeries,
  sparkStore
} from "@/lib/data/spark";

const retentionSeries = sparkRetentionSeries.map((item) => ({
  ...item,
  balance: Math.round((item.consistency + item.focus) / 2)
}));

const leaderboardScopes = ["friends", "exam", "institution", "weekly", "monthly"] as const;

export function SparkHub() {
  const [selectedAchievement, setSelectedAchievement] = useState<(typeof sparkAchievements)[number] | null>(null);
  const [activeLeaderboard, setActiveLeaderboard] = useState<(typeof leaderboardScopes)[number]>("friends");

  const currentLevelMilestone = useMemo(() => getSparkLevelMilestone(sparkProfile.level), []);
  const levelProgress = useMemo(() => Math.round(getSparkProgress(sparkProfile.xp, sparkProfile.level)), []);
  const nextLevelMilestones = sparkLevelMilestones.slice(sparkProfile.level - 1, sparkProfile.level + 2);
  const unlockedAchievements = sparkAchievements.filter((achievement) => achievement.unlocked);
  const leaderboard = sparkLeaderboards[activeLeaderboard];

  return (
    <TooltipProvider>
      <div className="space-y-6 pb-6">
        <section className="hero-gradient relative overflow-hidden rounded-[2.25rem] p-5 shadow-2xl sm:p-8">
          <motion.div
            className="absolute right-[-3rem] top-[-3rem] h-44 w-44 rounded-full bg-white/30 blur-3xl"
            animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.8, 0.45] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute left-6 top-6 h-3 w-3 rounded-full bg-white/70"
            animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-5">
              <Badge variant="secondary">Spark Motivation Engine</Badge>
              <div>
                <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground sm:text-6xl">Level {sparkProfile.level} {sparkProfile.title}</h1>
                <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-foreground/75 sm:text-lg">
                  {sparkProfile.progressMessage}
                </p>
              </div>

              <Card className="border-white/40 bg-white/45 shadow-xl shadow-primary/10 backdrop-blur">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-black text-foreground">Daily quote</p>
                      <p className="mt-1 text-sm leading-6 text-foreground/75">{sparkProfile.dailyQuote}</p>
                      <p className="mt-2 text-sm font-semibold text-foreground/65">{sparkProfile.encouragement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Current streak", value: `${sparkProfile.currentStreak} days`, icon: Flame },
                  { label: "Best streak", value: `${sparkProfile.bestStreak} days`, icon: Trophy },
                  { label: "Streak shields", value: `${sparkProfile.streakShields} saved`, icon: ShieldCheck }
                ].map((item) => (
                  <Card key={item.label} className="border-white/40 bg-white/45 shadow-lg shadow-primary/5 backdrop-blur">
                    <CardContent className="p-4">
                      <item.icon className="h-5 w-5 text-primary" />
                      <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-foreground/55">{item.label}</p>
                      <p className="mt-2 text-xl font-black text-foreground">{item.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full shadow-lg shadow-primary/20">
                  <PartyPopper className="h-4 w-4" />
                  Celebrate today&apos;s win
                </Button>
                <Button variant="outline" className="rounded-full bg-white/65">
                  <Repeat2 className="h-4 w-4" />
                  Save a streak
                </Button>
              </div>
            </div>

            <Card className="border-white/40 bg-white/55 shadow-2xl shadow-primary/10 backdrop-blur">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Badge>XP ring</Badge>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="mt-3 text-sm font-semibold text-foreground/65">Level {sparkProfile.level} · {getSparkLevelTitle(sparkProfile.level)}</p>
                      </TooltipTrigger>
                      <TooltipContent>Threshold {currentLevelMilestone.xpThreshold} XP · Next unlock {nextLevelMilestones[1]?.title ?? currentLevelMilestone.title}</TooltipContent>
                    </Tooltip>
                  </div>
                  <ProgressRing value={levelProgress} label="to next level" />
                </div>

                <Separator className="my-5 bg-white/60" />

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] bg-white/70 p-4">
                    <p className="text-sm font-black text-primary">{sparkProfile.xp} XP</p>
                    <p className="mt-1 text-sm leading-6 text-foreground/70">{sparkProfile.nextLevelXp - sparkProfile.xp} XP to Level {sparkProfile.level + 1}</p>
                    <Progress value={levelProgress} className="mt-3 h-3" />
                  </div>
                  <div className="rounded-[1.25rem] bg-white/70 p-4">
                    <p className="text-sm font-black text-primary">Focus XP</p>
                    <p className="mt-1 text-sm leading-6 text-foreground/70">{sparkProfile.focusXp} earned from deep work.</p>
                    <div className="mt-3 flex items-center gap-2 text-xs font-black text-foreground/65">
                      <Timer className="h-4 w-4" />
                      {sparkAnalytics.averageSessionMinutes} min average session
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Tabs defaultValue="overview" className="space-y-5">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-[1.4rem] bg-white/70 p-2 shadow-lg shadow-primary/5 backdrop-blur">
            {[
              ["overview", "Overview"],
              ["achievements", "Achievements"],
              ["challenges", "Challenges"],
              ["journey", "Journey"],
              ["leaders", "Leaderboards"],
              ["store", "Store"],
              ["analytics", "Analytics"]
            ].map(([value, label]) => (
              <TabsTrigger key={value} value={value} className="rounded-full px-4 py-2 text-sm font-black">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Motivation loop</CardTitle>
                  <CardDescription>Every login should feel inspiring, clear, and personal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-[1.25rem] bg-white/75 p-4">
                    <p className="text-sm font-black text-primary">Personalized encouragement</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{sparkProfile.progressMessage}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      ["Consistency", `${sparkAnalytics.consistency}%`],
                      ["Streak retention", `${sparkAnalytics.streakRetention}%`],
                      ["Goal completion", `${sparkAnalytics.goalCompletion}%`],
                      ["Challenge completion", `${sparkAnalytics.challengeCompletion}%`]
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[1.25rem] bg-white/75 p-4">
                        <p className="text-sm font-black text-foreground/60">{label}</p>
                        <p className="mt-2 text-2xl font-black text-foreground">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Notification psychology</CardTitle>
                  <CardDescription>Smart, sparse, and always tied to an action.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sparkNotifications.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-[1.25rem] bg-white/75 p-4">
                      <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm leading-6 text-foreground/75">{item}</p>
                    </div>
                  ))}
                  <div className="rounded-[1.25rem] bg-emerald-500/10 p-4">
                    <p className="text-sm font-black text-emerald-700">Anti-spam rule</p>
                    <p className="mt-1 text-sm leading-6 text-foreground/70">Trigger only when a streak, challenge, or readiness milestone needs attention.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Focus rewards</CardTitle>
                  <CardDescription>Deep work should feel valuable immediately.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["Deep work XP", "+40 per focus session", Zap],
                      ["Pomodoro bonus", "+15 on completion", PlayCircle],
                      ["Revision consistency", "+20 on repeat reviews", Repeat2]
                    ].map(([title, helper, IconComponent]) => {
                      const Icon = IconComponent as React.FC<any>;
                      return (
                        <div key={title as string} className="rounded-[1.25rem] bg-white/75 p-4">
                          <Icon className="h-5 w-5 text-primary" />
                          <p className="mt-3 text-sm font-black text-foreground">{title as string}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{helper as string}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Level unlock preview</CardTitle>
                  <CardDescription>Level 1 → Level 100 is a steady climb, not a wall.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {nextLevelMilestones.map((milestone) => (
                    <div key={milestone.level} className="rounded-[1.25rem] bg-white/75 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-black text-foreground">Level {milestone.level}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{milestone.title}</p>
                        </div>
                        <Badge variant={milestone.level === sparkProfile.level ? "default" : "outline"}>{milestone.badge}</Badge>
                      </div>
                      <Progress value={milestone.level <= sparkProfile.level ? 100 : Math.min(100, ((sparkProfile.xp - getSparkLevelMilestone(milestone.level - 1).xpThreshold) / Math.max(milestone.xpThreshold - getSparkLevelMilestone(milestone.level - 1).xpThreshold, 1)) * 100)} className="mt-3 h-2.5" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Achievement gallery</CardTitle>
                  <CardDescription>Unlocks should feel like a celebration, not a checklist.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {sparkAchievements.map((achievement) => (
                      <button
                        key={achievement.id}
                        type="button"
                        onClick={() => setSelectedAchievement(achievement)}
                        className={cn("group text-left transition hover:-translate-y-0.5", achievement.unlocked ? "" : "opacity-85")}
                      >
                        <Card className={cn("h-full border-white/50 bg-white/75 shadow-lg shadow-primary/5 backdrop-blur", !achievement.unlocked && "opacity-70") }>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className={cn("grid h-12 w-12 place-items-center rounded-2xl", achievement.unlocked ? "bg-primary/12 text-primary" : "bg-muted text-muted-foreground") }>
                                {achievement.unlocked ? <Trophy className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                              </div>
                              <Badge variant={achievement.unlocked ? "default" : "outline"}>{achievement.category}</Badge>
                            </div>
                            <h3 className="mt-4 text-lg font-black">{achievement.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">{achievement.description}</p>
                            <div className="mt-4">
                              <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-foreground/55">
                                <span>{achievement.progress}/{achievement.target}</span>
                                <span>{achievement.xpReward} XP</span>
                              </div>
                              <Progress value={Math.min(100, (achievement.progress / achievement.target) * 100)} className="h-2.5" />
                            </div>
                          </CardContent>
                        </Card>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Locked achievements</CardTitle>
                  <CardDescription>Progress toward achievement unlocks stays visible.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sparkAchievements.filter((achievement) => !achievement.unlocked).map((achievement) => (
                    <div key={achievement.id} className="rounded-[1.25rem] bg-white/75 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-black text-foreground">{achievement.title}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{achievement.progress} / {achievement.target}</p>
                        </div>
                        <Badge variant="outline">Locked</Badge>
                      </div>
                      <Progress value={Math.min(100, (achievement.progress / achievement.target) * 100)} className="mt-3 h-2.5" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Study challenges</CardTitle>
                  <CardDescription>Daily, weekly, and monthly loops keep students coming back.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {sparkChallenges.map((challenge) => (
                    <div key={challenge.id} className="rounded-[1.25rem] bg-white/75 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Badge variant="secondary">{challenge.period}</Badge>
                          <p className="mt-3 text-lg font-black text-foreground">{challenge.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">Target: {challenge.target} · {challenge.dueLabel}</p>
                        </div>
                        <Badge>{challenge.xpReward} XP</Badge>
                      </div>
                      <div className="mt-4">
                        <div className="mb-2 flex justify-between text-sm font-bold">
                          <span>Progress</span>
                          <span>{challenge.progress}/{challenge.period === "daily" ? 20 : challenge.period === "weekly" ? 120 : 3}</span>
                        </div>
                        <Progress value={Math.min(100, challenge.progress / (challenge.period === "daily" ? 20 : challenge.period === "weekly" ? 120 : 3) * 100)} className="h-3" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Reward logic</CardTitle>
                  <CardDescription>Healthy loops, not endless loops.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    ["Quiz completion", "+10 to +40 XP", BookOpen],
                    ["Revision completion", "+15 to +35 XP", Repeat2],
                    ["Study sessions", "+25 to +60 XP", Timer],
                    ["Goal completion", "+50 to +150 XP", Target],
                    ["Streak day", "+10 XP + streak shield chance", Flame]
                  ].map(([label, helper, IconComponent]) => {
                    const Icon = IconComponent as React.FC<any>;
                    return (
                      <div key={label as string} className="flex items-start gap-3 rounded-[1.25rem] bg-white/75 p-4">
                        <Icon className="mt-0.5 h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-black text-foreground">{label as string}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{helper as string}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="rounded-[1.25rem] bg-primary/10 p-4">
                    <p className="text-sm font-black text-primary">Streak recovery</p>
                    <p className="mt-1 text-sm leading-6 text-foreground/75">One shield can protect a streak on an occasional missed day to keep students engaged without guilt.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="journey" className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Learning journey map</CardTitle>
                  <CardDescription>Show current position, completed topics, upcoming topics, and roadmap progress.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sparkJourney.map((node, index) => (
                    <div key={node.title} className="flex items-start gap-4 rounded-[1.25rem] bg-white/75 p-4">
                      <div className={cn("grid h-10 w-10 place-items-center rounded-2xl", index === 0 ? "bg-primary text-primary-foreground" : node.status === "done" ? "bg-emerald-500/15 text-emerald-700" : "bg-muted text-muted-foreground") }>
                        {index === 0 ? <Sparkles className="h-5 w-5" /> : node.status === "done" ? <ShieldCheck className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-black text-foreground">{node.title}</p>
                            <p className="mt-1 text-sm text-muted-foreground">{node.body}</p>
                          </div>
                          <Badge variant={index === 0 ? "default" : "outline"}>{node.progress}%</Badge>
                        </div>
                        <Progress value={node.progress} className="mt-3 h-2.5" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Level roadmap</CardTitle>
                  <CardDescription>Level 1 to Level 100 scales through readable bands.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {nextLevelMilestones.map((milestone) => (
                    <div key={milestone.level} className="rounded-[1.25rem] bg-white/75 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-black text-foreground">Level {milestone.level}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{milestone.title}</p>
                        </div>
                        <Badge variant="secondary">{milestone.badge}</Badge>
                      </div>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">Unlocks</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {milestone.unlocks.map((unlock) => (
                          <Badge key={unlock} variant="outline">{unlock}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leaders" className="space-y-5">
            <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">Leaderboards</CardTitle>
                <CardDescription>Friends, exam, institution, weekly, and monthly views with privacy opt-in.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeLeaderboard} onValueChange={(value) => setActiveLeaderboard(value as typeof activeLeaderboard)}>
                  <TabsList className="h-auto flex-wrap justify-start rounded-[1.25rem] bg-white/75 p-2">
                    {leaderboardScopes.map((scope) => (
                      <TabsTrigger key={scope} value={scope} className="rounded-full px-4 py-2 capitalize">
                        {scope}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                <div className="mt-5 grid gap-3">
                  {leaderboard.map((entry) => (
                    <div key={`${activeLeaderboard}-${entry.rank}`} className="flex items-center gap-4 rounded-[1.25rem] bg-white/75 p-4">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/12 font-black text-primary">#{entry.rank}</div>
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback>{entry.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-black text-foreground">{entry.name}</p>
                        <p className="text-sm text-muted-foreground">+{entry.delta} this week</p>
                      </div>
                      <Badge variant={entry.visible ? "default" : "outline"}>{entry.score} XP</Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-[1.25rem] bg-primary/10 p-4">
                  <p className="text-sm font-black text-primary">Privacy control</p>
                  <p className="mt-1 text-sm leading-6 text-foreground/75">Opt in to friends, class, or institutional leaderboards. Hide ranks when needed.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="store" className="space-y-5">
            <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">Spark Store architecture</CardTitle>
                <CardDescription>Future-ready reward storefront for themes, frames, badges, avatars, and customizations.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {sparkStore.map((item) => (
                    <div key={item.id} className="rounded-[1.25rem] bg-white/75 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Badge variant="secondary">{item.category.replace("_", " ")}</Badge>
                          <p className="mt-3 text-lg font-black text-foreground">{item.title}</p>
                        </div>
                        <Gift className="h-5 w-5 text-primary" />
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <Badge variant={item.available ? "default" : "outline"}>{item.xpCost} XP</Badge>
                        <span className="text-xs font-black uppercase tracking-[0.18em] text-foreground/50">{item.available ? "Available" : "Future"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-5">
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {[
                ["DAU", sparkAnalytics.dau],
                ["Consistency", `${sparkAnalytics.consistency}%`],
                ["Streak retention", `${sparkAnalytics.streakRetention}%`],
                ["Goal completion", `${sparkAnalytics.goalCompletion}%`],
                ["Challenge completion", `${sparkAnalytics.challengeCompletion}%`],
                ["Avg session", `${sparkAnalytics.averageSessionMinutes}m`]
              ].map(([label, value]) => (
                <Card key={label as string} className="border-white/50 bg-white/75 shadow-lg shadow-primary/5 backdrop-blur">
                  <CardContent className="p-4">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-foreground/50">{label as string}</p>
                    <p className="mt-3 text-2xl font-black text-foreground">{value as string | number}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Retention trend</CardTitle>
                  <CardDescription>Keep studying through progress messages, streak nudges, and challenge loops.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72 w-full">
                    <ResponsiveContainer>
                      <AreaChart data={retentionSeries} margin={{ left: -10, right: 8, top: 10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="sparkRetention" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgb(var(--chart-one))" stopOpacity={0.45} />
                            <stop offset="100%" stopColor="rgb(var(--chart-one))" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 6" stroke="hsl(var(--border))" vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{ borderRadius: 18, border: "1px solid hsl(var(--border))" }} />
                        <Area type="monotone" dataKey="balance" stroke="rgb(var(--chart-one))" fill="url(#sparkRetention)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Unlock flow</CardTitle>
                  <CardDescription>Use motion, sound placeholders, and celebration states for progress events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    ["Topic completion", "Confetti burst + XP toast", PartyPopper],
                    ["Level up", "Full-screen level card", Crown],
                    ["Achievement unlock", "Animated sheet + reward badge", Award],
                    ["Streak milestone", "Glowing streak chip", Flame]
                  ].map(([label, helper, IconComponent]) => {
                    const Icon = IconComponent as React.FC<any>;
                    return (
                      <div key={label as string} className="flex items-start gap-3 rounded-[1.25rem] bg-white/75 p-4">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <p className="text-sm font-black text-foreground">{label as string}</p>
                          <p className="mt-1 text-sm leading-6 text-muted-foreground">{helper as string}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {selectedAchievement ? (
          <Sheet open={Boolean(selectedAchievement)} onOpenChange={(open) => !open && setSelectedAchievement(null)}>
            <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
              <SheetHeader className="space-y-4">
                <div className="grid h-16 w-16 place-items-center rounded-[1.5rem] bg-primary/12 text-primary">
                  {selectedAchievement.unlocked ? <Trophy className="h-8 w-8" /> : <Lock className="h-8 w-8" />}
                </div>
                <div>
                  <SheetTitle className="text-2xl">{selectedAchievement.title}</SheetTitle>
                  <SheetDescription className="mt-2 text-sm leading-6">
                    {selectedAchievement.description}
                  </SheetDescription>
                </div>
              </SheetHeader>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-6 space-y-4">
                <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-foreground">Unlock progress</p>
                        <p className="mt-1 text-sm text-muted-foreground">{selectedAchievement.progress}/{selectedAchievement.target}</p>
                      </div>
                      <Badge>{selectedAchievement.xpReward} XP</Badge>
                    </div>
                    <Progress value={Math.min(100, (selectedAchievement.progress / selectedAchievement.target) * 100)} className="mt-4 h-3" />
                  </CardContent>
                </Card>

                <Card className="border-white/50 bg-white/75 shadow-xl shadow-primary/5 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-xl">Celebrate unlocks</CardTitle>
                    <CardDescription>Use confetti, motion, and a sound placeholder when this becomes real.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center gap-3">
                    <PartyPopper className="h-6 w-6 text-primary" />
                    <p className="text-sm text-muted-foreground">Achievement unlock modal ready for future wiring.</p>
                  </CardContent>
                </Card>

                <Button className="w-full rounded-full" onClick={() => setSelectedAchievement(null)}>
                  Close
                </Button>
              </motion.div>
            </SheetContent>
          </Sheet>
        ) : null}
      </div>
    </TooltipProvider>
  );
}
