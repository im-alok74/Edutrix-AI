"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type EduTrixTheme = "aurora" | "midnight" | "forest" | "solar" | "ocean";

const themes: EduTrixTheme[] = ["aurora", "midnight", "forest", "solar", "ocean"];

type ThemeContextValue = {
  theme: EduTrixTheme;
  setTheme: (theme: EduTrixTheme) => void;
  themes: EduTrixTheme[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function EduTrixThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<EduTrixTheme>("aurora");

  useEffect(() => {
    const stored = window.localStorage.getItem("edutrix-theme") as EduTrixTheme | null;
    if (stored && themes.includes(stored)) setThemeState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "aurora" ? "" : theme;
    window.localStorage.setItem("edutrix-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme: setThemeState,
      themes
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useEduTrixTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useEduTrixTheme must be used inside EduTrixThemeProvider");
  return context;
}
