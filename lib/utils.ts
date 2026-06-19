import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function percent(value: number) {
  return `${Math.round(value)}%`;
}

export function examCountdown(target?: Date | string | null) {
  if (!target) return "Set target date";
  const end = typeof target === "string" ? new Date(target) : target;
  const days = Math.ceil((end.getTime() - Date.now()) / 86_400_000);
  return days > 0 ? `${days} days left` : "Exam window is here";
}
