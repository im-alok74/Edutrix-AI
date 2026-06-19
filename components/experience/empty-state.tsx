import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ icon: Icon, title, body, action }: { icon: LucideIcon; title: string; body: string; action: string }) {
  return (
    <div className="premium-card rounded-[2rem] p-6 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.5rem] bg-primary/12 text-primary">
        <Icon className="h-9 w-9" />
      </div>
      <h3 className="mt-5 text-xl font-black">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{body}</p>
      <Button className="mt-5 rounded-full">{action}</Button>
    </div>
  );
}
