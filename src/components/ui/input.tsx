import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-spice-warm/20 bg-cream px-4 py-2 text-sm text-spice-brown placeholder:text-spice-warm/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon/30 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-spice-brown/20 dark:border-cream/10 dark:text-cream",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
