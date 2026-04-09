'use client';

import React from 'react';

interface SpiralBindingProps {
  accentColor: string;
}

export default function SpiralBinding({ accentColor }: SpiralBindingProps) {
  const coils = Array.from({ length: 22 }, (_, i) => i);

  return (
    <div className="relative w-full flex items-center justify-center py-1 bg-white dark:bg-gray-900 z-10">
      {/* Metal rod */}
      <div
        className="absolute left-0 right-0 h-[3px] top-1/2 -translate-y-1/2 z-0 opacity-30"
        style={{ backgroundColor: accentColor }}
      />
      {/* Coils */}
      <div className="relative z-10 flex items-center gap-[calc((100%-760px)/31)] px-6 w-full max-w-[860px]">
        {coils.map(i => (
          <svg
            key={i}
            width="18"
            height="24"
            viewBox="0 0 18 24"
            className="flex-shrink-0"
          >
            {/* Spiral coil shape */}
            <ellipse
              cx="9"
              cy="12"
              rx="7"
              ry="11"
              fill="none"
              stroke="#9CA3AF"
              strokeWidth="2.5"
            />
            <ellipse
              cx="9"
              cy="12"
              rx="4"
              ry="7"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="1.5"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
