import { Bell, Brain, Languages, Palette, SlidersHorizontal, Target } from "lucide-react";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { Card } from "@/components/ui/card";

const settings = [
  { title: "Notifications", body: "Study reminders, revision nudges, timetable alerts.", icon: Bell },
  { title: "Study Preferences", body: "Daily hours, preferred session length, break rhythm.", icon: SlidersHorizontal },
  { title: "Exam Type", body: "GATE, JEE, NEET, CUET, UPSC, and school exam paths.", icon: Target },
  { title: "AI Preferences", body: "Nova tone, explanation depth, language style.", icon: Brain },
  { title: "Language", body: "Future-ready multilingual learning experience.", icon: Languages }
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="border-white/50 bg-white/80 shadow-xl shadow-primary/5 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/12 text-primary">
            <Palette className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black">Make EduTrix yours</h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">Themes update instantly and persist on this device.</p>
          </div>
        </div>
        <div className="mt-6">
          <ThemeSelector />
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {settings.map((item) => (
          <Card key={item.title} className="border-white/50 bg-white/75 shadow-lg shadow-primary/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl">
            <item.icon className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-xl font-black">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
            <label className="mt-4 flex items-center justify-between rounded-2xl bg-white/55 p-3 text-sm font-black">
              Enabled
              <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
            </label>
          </Card>
        ))}
      </div>
    </div>
  );
}
