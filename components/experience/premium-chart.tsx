"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const mastery = [
  { day: "M", score: 48, hours: 2.1 },
  { day: "T", score: 56, hours: 2.8 },
  { day: "W", score: 61, hours: 3.2 },
  { day: "T", score: 68, hours: 2.6 },
  { day: "F", score: 72, hours: 3.8 },
  { day: "S", score: 79, hours: 4.2 },
  { day: "S", score: 84, hours: 3.4 }
];

export function MasteryGlowChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <AreaChart data={mastery} margin={{ left: -20, right: 8, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="themeScore" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--chart-one))" stopOpacity={0.55} />
              <stop offset="100%" stopColor="rgb(var(--chart-one))" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 6" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid hsl(var(--border))" }} />
          <Area type="monotone" dataKey="score" stroke="rgb(var(--chart-one))" strokeWidth={4} fill="url(#themeScore)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StudyHoursBars() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer>
        <BarChart data={mastery} margin={{ left: -24, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 6" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid hsl(var(--border))" }} />
          <Bar dataKey="hours" fill="rgb(var(--chart-two))" radius={[14, 14, 6, 6]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
