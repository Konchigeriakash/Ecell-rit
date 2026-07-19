"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const BUBBLE_COUNT = 15;

type Bubble = {
  id: number;
  style: React.CSSProperties;
  className: string;
};

export function HeroAnimation() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateBubbles = () => {
      return Array.from({ length: BUBBLE_COUNT }).map((_, i) => {
        const size = Math.random() * 80 + 20; // 20px to 100px
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10; // 10s to 20s
        const animationDelay = Math.random() * 10;
        const colorClass = Math.random() > 0.5 ? "bg-primary" : "bg-accent";

        return {
          id: i,
          style: {
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${animationDelay}s`,
          },
          className: cn(
            "absolute rounded-full opacity-20 animate-float",
            colorClass
          ),
        };
      });
    };
    setBubbles(generateBubbles());
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="relative w-full h-full">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={bubble.className}
            style={bubble.style}
          />
        ))}
      </div>
    </div>
  );
}
