"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Root } from "@radix-ui/react-checkbox";

import { cn } from "@/libs/utils";

const Checkbox = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-neutral-50 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-emerald-300 data-[state=checked]:bg-emerald-300 data-[state=checked]:text-emerald-300",
      className,
    )}
    {...props}
  />
));
Checkbox.displayName = Root.displayName;

export { Checkbox };
