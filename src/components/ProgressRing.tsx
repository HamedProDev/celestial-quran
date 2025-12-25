import { useState } from "react";
import { Play, Pause } from "lucide-react";

interface ProgressRingProps {
  progress: number; // 0-100
  onToggle?: () => void;
  isPlaying?: boolean;
}

const ProgressRing = ({ progress, onToggle, isPlaying = false }: ProgressRingProps) => {
  const circumference = 220;
  const offset = circumference - (circumference * progress) / 100;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[800] cursor-pointer group"
      onClick={onToggle}
    >
      <svg width="80" height="80" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="hsl(var(--background))"
          stroke="hsla(43, 76%, 52%, 0.2)"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <circle
          cx="40"
          cy="40"
          r="35"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
      </svg>
      
      {/* Center button */}
      <div className="absolute inset-0 flex items-center justify-center group-hover:bg-primary/10 rounded-full transition-colors">
        {isPlaying ? (
          <Pause className="w-6 h-6 text-primary" />
        ) : (
          <Play className="w-6 h-6 text-primary ml-1" />
        )}
      </div>
    </div>
  );
};

export default ProgressRing;
