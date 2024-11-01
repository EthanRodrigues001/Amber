"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const Lamp = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/4 max-w-3xl">
        <div className="h-1 w-full bg-amber-500 relative">
          <div className="absolute inset-0 blur-sm bg-amber-500"></div>
          <div
            className="absolute h-32 w-full bg-gradient-to-b from-amber-500/50 via-amber-500/25 to-transparent"
            style={{
              background: `
                radial-gradient(
                  ellipse at 49% 0%, 
                  rgba(251, 191, 36, 0.15) 0%,
                  rgba(251, 191, 36, 0.1) 25%,
                  rgba(251, 191, 36, 0.05) 50%,
                  transparent 80%
                )
              `,
            }}
          ></div>
        </div>
      </div>
      <div className="relative z-10 pt-14"></div>
    </div>
  );
};
