'use client';

import { useState, useEffect, useCallback } from 'react';
import { SavedRange } from '@/types/calendar';
import { getDayDateKey } from '@/utils/dateHelpers';
import { RANGE_COLORS } from '@/utils/colors';

export function useRangeNotes() {
  const [savedRanges, setSavedRanges] = useState<SavedRange[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('calendar_range_notes');
      if (saved) {
        try {
          setSavedRanges(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse calendar range notes', e);
        }
      }
    }
  }, []);

  const persist = useCallback((ranges: SavedRange[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('calendar_range_notes', JSON.stringify(ranges));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  }, []);

  const addRange = useCallback((start: Date, end: Date) => {
    const id = Math.random().toString(36).substr(2, 9);
    setSavedRanges(prev => {
      const nextColor = RANGE_COLORS[prev.length % RANGE_COLORS.length];
      const newRange: SavedRange = {
        id,
        start: getDayDateKey(start),
        end: getDayDateKey(end),
        color: nextColor,
        note: '',
      };
      const next = [...prev, newRange];
      persist(next);
      return next;
    });
    return id; // Return the new ID so the UI can focus it
  }, [persist]);

  const updateRangeNote = useCallback((id: string, note: string) => {
    setSavedRanges(prev => {
      const next = prev.map(r => r.id === id ? { ...r, note } : r);
      persist(next);
      return next;
    });
  }, [persist]);

  const deleteRange = useCallback((id: string) => {
    setSavedRanges(prev => {
      const next = prev.filter(r => r.id !== id);
      persist(next);
      return next;
    });
  }, [persist]);

  const toggleRangeComplete = useCallback((id: string) => {
    setSavedRanges(prev => {
      const next = prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r);
      persist(next);
      return next;
    });
  }, [persist]);

  const toggleRangeCategory = useCallback((id: string, category: string) => {
    setSavedRanges(prev => {
      const next = prev.map(r => {
        if (r.id !== id) return r;
        const current = r.categories || [];
        const nextCats = current.includes(category)
          ? current.filter(c => c !== category)
          : [...current, category];
        return { ...r, categories: nextCats };
      });
      persist(next);
      return next;
    });
  }, [persist]);

  return { savedRanges, addRange, updateRangeNote, deleteRange, toggleRangeComplete, toggleRangeCategory, isSaved };
}
