'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { formatDateKey } from '@/utils/dateHelpers';

interface UseNotesReturn {
  notes: string;
  isSaved: boolean;
  updateNotes: (text: string) => void;
}

export function useNotes(year: number, month: number): UseNotesReturn {
  const key = formatDateKey(year, month);
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load notes when month/year key changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(key) ?? '';
      setNotes(saved);
      setIsSaved(false);
    }
  }, [key]);

  const updateNotes = useCallback((text: string) => {
    setNotes(text);
    setIsSaved(false);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      localStorage.setItem(key, text);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 500);
  }, [key]);

  return { notes, isSaved, updateNotes };
}
