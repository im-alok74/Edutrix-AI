import type { Metadata } from "next";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { EduTrixThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduTrix | Your Personal Learning Universe",
  description: "AI-powered adaptive learning for GATE, JEE, NEET, CUET, and school exams."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AuthSessionProvider>
          <EduTrixThemeProvider>{children}</EduTrixThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
