"use client";

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 glass hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground cursor-pointer"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100 text-indigo-600" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100 text-amber-400" />
      )}
    </button>
  );
}
