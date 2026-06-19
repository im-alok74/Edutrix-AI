"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { day: "Mon", hours: 2.5, accuracy: 62 },
  { day: "Tue", hours: 3.2, accuracy: 68 },
  { day: "Wed", hours: 2.1, accuracy: 71 },
  { day: "Thu", hours: 4.0, accuracy: 76 },
  { day: "Fri", hours: 3.5, accuracy: 79 },
  { day: "Sat", hours: 4.5, accuracy: 83 },
  { day: "Sun", hours: 3.8, accuracy: 85 }
];

export function GrowthChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="hours" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e9dcc7" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="accuracy" stroke="#34d399" fill="url(#hours)" strokeWidth={3} />
          <Area type="monotone" dataKey="hours" stroke="#f59e0b" fill="url(#hours)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
