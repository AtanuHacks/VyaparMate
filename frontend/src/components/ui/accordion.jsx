import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";

export function Accordion({ className, ...props }) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border-b border-gray-200 last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

export function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex w-full items-center justify-between",
          "py-4 sm:py-5",
          "text-left",
          "text-sm sm:text-base",
          "font-medium",
          "transition-all",
          "hover:text-green-600",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        <span className="pr-4">{children}</span>
        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden",
        "text-sm sm:text-base",
        "text-gray-600",
        "data-[state=closed]:animate-accordion-up",
        "data-[state=open]:animate-accordion-down"
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-1 pr-6", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
