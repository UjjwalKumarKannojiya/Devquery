"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null; // avoid hydration mismatch
  }

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-card border border-border rounded-full p-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-300 text-muted-foreground shadow-sm"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <Sun
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isDark ? "opacity-0" : "opacity-100"}`}
        />
        {/* Moon icon */}
        <Moon
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isDark ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </button>
  );
}
