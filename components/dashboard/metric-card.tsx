import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: LucideIcon }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-black">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
          </div>
          <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
            <Icon className="h-5 w-5" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
