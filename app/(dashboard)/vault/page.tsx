import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function VaultPage() {
  return (
    <div className="space-y-5">
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-3xl">Vault and Echo</CardTitle>
          <p className="text-sm font-medium text-muted-foreground">Wrong questions, bookmarks, notes, and spaced repetition intervals of 1, 3, 7, 15, and 30 days.</p>
        </CardHeader>
        <CardContent>
          <Input placeholder="Filter mistakes, notes, bookmarks, PYQs..." />
        </CardContent>
      </Card>
      <div className="grid gap-3 md:grid-cols-2">
        {["Wrong Questions", "Bookmarked Questions", "Important Notes", "Upcoming Revisions"].map((item) => (
          <Card key={item} className="premium-card">
            <CardContent className="p-4">
              <p className="font-black">{item}</p>
              <p className="mt-1 text-sm text-muted-foreground">Stored with topic, tags, explanation, and Nexus activity history.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
