import { AppShell } from "@/components/experience/app-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
