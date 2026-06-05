import React from "react";
import { cn } from "@/lib/utils"; // utility to combine class names if exists, else fallback

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional class names */
  className?: string;
  children: React.ReactNode;
}

/**
 * Simple wrapper that applies the `glass-card` utility class.
 * Usage: <GlassCard className="p-6">...</GlassCard>
 */
export const GlassCard = ({ className, children, ...props }: GlassCardProps) => {
  return (
    <div
       className={cn("surface", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
