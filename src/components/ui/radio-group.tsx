"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Root, Item, Indicator } from "@radix-ui/react-radio-group";

import { cn } from "@/libs/utils";

const RadioGroup = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  return <Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = Root.displayName;

const RadioGroupItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-neutral-200 text-emerald-300 ring-offset-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Indicator className="flex items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 fill-current text-current" />
      </Indicator>
    </Item>
  );
});
RadioGroupItem.displayName = Item.displayName;

export { RadioGroup, RadioGroupItem };
