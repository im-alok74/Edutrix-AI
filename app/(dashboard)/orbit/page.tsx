import { createTimetableItem } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OrbitPage() {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-3xl">Create Orbit</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createTimetableItem} className="grid gap-3">
            <Input name="title" placeholder="Electrostatics practice" required />
            <select name="type" className="h-12 rounded-2xl border bg-white/70 px-3 font-bold">
              <option>DAILY</option>
              <option>WEEKLY</option>
              <option>MONTHLY</option>
            </select>
            <Input name="subject" placeholder="Subject" />
            <Input name="topic" placeholder="Topic" />
            <Input name="startsAt" type="datetime-local" required />
            <Input name="durationMin" type="number" placeholder="60" />
            <Button className="rounded-full">Create Orbit block</Button>
          </form>
        </CardContent>
      </Card>
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-3xl">Today&apos;s Flow</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {["Warm-up revision", "Deep work topic block", "Quest mock test", "Mistake review"].map((item) => (
            <div key={item} className="rounded-[1.4rem] border bg-white/55 p-4">
              <p className="font-bold">{item}</p>
              <p className="text-sm text-muted-foreground">Create, edit, delete, or duplicate from the timetable service.</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
