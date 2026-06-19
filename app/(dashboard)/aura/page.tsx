import { saveAuraProfile } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AuraPage() {
  return (
    <Card className="premium-card">
      <CardHeader>
        <CardTitle className="text-3xl">Aura Student Profile</CardTitle>
        <p className="text-sm font-medium text-muted-foreground">Build the learning identity Nova, Compass, Pulse, and Athena will use.</p>
      </CardHeader>
      <CardContent>
        <form action={saveAuraProfile} className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Exam
            <select name="exam" className="h-12 rounded-2xl border bg-white/70 px-3 font-bold">
              {["GATE", "JEE", "NEET", "CUET", "SCHOOL"].map((exam) => <option key={exam}>{exam}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Target rank
            <Input name="targetRank" type="number" placeholder="500" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Daily study hours
            <Input name="dailyStudyHours" type="number" step="0.5" placeholder="4" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Learning style
            <select name="learningStyle" className="h-12 rounded-2xl border bg-white/70 px-3 font-bold">
              <option value="mixed">Mixed</option>
              <option value="visual">Visual</option>
              <option value="practice-first">Practice first</option>
              <option value="story">Story based</option>
              <option value="formula-led">Formula led</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold md:col-span-2">
            Weak subjects
            <Input name="weakSubjects" placeholder="Physics, Organic Chemistry" />
          </label>
          <label className="grid gap-2 text-sm font-semibold md:col-span-2">
            Strong subjects
            <Input name="strongSubjects" placeholder="Mathematics, Biology" />
          </label>
          <Button className="rounded-full md:col-span-2">Save Aura</Button>
        </form>
      </CardContent>
    </Card>
  );
}
