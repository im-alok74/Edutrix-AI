import { NovaChat } from "@/components/modules/nova-chat";

export default function NovaPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-4xl font-black">Nova</h1>
        <p className="mt-2 text-base font-medium text-muted-foreground">Your personal mentor for doubts, notes, plans, revision, and calm direction.</p>
      </div>
      <NovaChat />
    </div>
  );
}
