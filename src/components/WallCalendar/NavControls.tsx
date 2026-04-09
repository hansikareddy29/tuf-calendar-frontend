'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavControlsProps {
  onPrev: () => void;
  onNext: () => void;
  accentColor: string;
}

export default function NavControls({ onPrev, onNext, accentColor }: NavControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: `${accentColor}15` }}
        aria-label="Previous month"
      >
        <ChevronLeft size={16} style={{ color: accentColor }} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: `${accentColor}15` }}
        aria-label="Next month"
      >
        <ChevronRight size={16} style={{ color: accentColor }} />
      </motion.button>
    </div>
  );
}
