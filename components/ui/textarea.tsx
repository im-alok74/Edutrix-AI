import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn("min-h-24 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
