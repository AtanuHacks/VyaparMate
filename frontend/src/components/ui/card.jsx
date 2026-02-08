import * as React from "react";
import { cn } from "./utils";

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white text-gray-900 flex flex-col gap-6",
        "rounded-2xl border border-gray-200",
        "shadow-sm",
        "transition-all duration-200 ease-out",
        "hover:shadow-lg hover:-translate-y-1",
        "px-0",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min items-start gap-1.5",
        "px-4 sm:px-6 pt-4 sm:pt-6",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h4
      data-slot="card-title"
      className={cn(
        "leading-tight font-semibold",
        "text-base sm:text-lg",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-gray-500",
        "text-sm sm:text-base",
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-4 sm:px-6",
        "[&:last-child]:pb-4 sm:[&:last-child]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center",
        "px-4 sm:px-6 pb-4 sm:pb-6",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
