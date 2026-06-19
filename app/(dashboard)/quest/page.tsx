import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuestPage() {
  const options = ["4", "8", "16", "32"];
  return (
    <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-3xl">Adaptive Practice</CardTitle>
          <p className="text-sm font-medium text-muted-foreground">MCQ, MSQ, numerical, PYQs, custom tests, and mock tests share the same question schema.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-[1.5rem] bg-muted p-4">
            <p className="text-sm font-semibold text-indigo-700">Sample numerical question</p>
            <h2 className="mt-2 text-xl font-black">If the learning velocity doubles after 3 correct attempts, what is the next revision interval?</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {options.map((option) => (
              <button key={option} className="touch-target rounded-[1.25rem] border bg-white/70 p-4 text-left font-black hover:border-primary hover:bg-primary/10">
                {option} days
              </button>
            ))}
          </div>
          <Button>
            <CheckCircle2 className="h-4 w-4" />
            Submit attempt
          </Button>
        </CardContent>
      </Card>
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-3xl">Test Modes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {["Topic Practice", "PYQs", "Custom Tests", "Mock Tests"].map((mode) => (
            <div key={mode} className="rounded-[1.35rem] bg-white/55 p-4 shadow-sm">
              <p className="font-bold">{mode}</p>
              <p className="text-sm text-muted-foreground">Difficulty, time, explanation, and Nexus event capture enabled.</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
