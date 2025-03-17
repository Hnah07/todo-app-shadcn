import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-stone-200 px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-stone-950 focus-visible:ring-stone-950/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 transition-[color,box-shadow] overflow-hidden dark:border-stone-800 dark:focus-visible:border-stone-300 dark:focus-visible:ring-stone-300/50 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-stone-900 text-stone-50 [a&]:hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:[a&]:hover:bg-stone-50/90",
        Work: "border-transparent bg-[#f59e0b] text-white [a&]:hover:bg-[#f59e0b]/90 dark:bg-[#f59e0b] dark:text-white dark:[a&]:hover:bg-[#f59e0b]/90",
        Personal:
          "border-transparent bg-[#ef4444] text-white [a&]:hover:bg-[#ef4444]/90 dark:bg-[#ef4444] dark:text-white dark:[a&]:hover:bg-[#ef4444]/90",
        Shopping:
          "border-transparent bg-[#3b82f6] text-white [a&]:hover:bg-[#3b82f6]/90 dark:bg-[#3b82f6] dark:text-white dark:[a&]:hover:bg-[#3b82f6]/90",
        Health:
          "border-transparent bg-[#10b981] text-white [a&]:hover:bg-[#10b981]/90 dark:bg-[#10b981] dark:text-white dark:[a&]:hover:bg-[#10b981]/90",
        Learning:
          "border-transparent bg-[#8b5cf6] text-white [a&]:hover:bg-[#8b5cf6]/90 dark:bg-[#8b5cf6] dark:text-white dark:[a&]:hover:bg-[#8b5cf6]/90",
        Destructive:
          "border-transparent bg-red-500 text-white [a&]:hover:bg-red-500/90 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40 dark:bg-red-500/70 dark:bg-red-900 dark:[a&]:hover:bg-red-900/90 dark:focus-visible:ring-red-900/20 dark:dark:focus-visible:ring-red-900/40 dark:dark:bg-red-900/70",
        outline:
          "text-stone-950 [a&]:hover:bg-stone-100 [a&]:hover:text-stone-900 dark:text-stone-50 dark:[a&]:hover:bg-stone-800 dark:[a&]:hover:text-stone-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
