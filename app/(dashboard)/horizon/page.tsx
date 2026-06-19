import { GrowthChart } from "@/components/dashboard/growth-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HorizonPage() {
  return (
    <div className="space-y-5">
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-3xl">Horizon Analytics</CardTitle>
          <p className="text-sm font-medium text-muted-foreground">Study hours, questions solved, accuracy, mastery, weak topics, strong topics, weekly and monthly growth.</p>
        </CardHeader>
        <CardContent>
          <GrowthChart />
        </CardContent>
      </Card>
      <div className="grid gap-3 md:grid-cols-3">
        {["Weak Topics", "Strong Topics", "Monthly Growth"].map((title) => (
          <Card key={title} className="premium-card">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">Connected to Pulse and Mastery records.</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
