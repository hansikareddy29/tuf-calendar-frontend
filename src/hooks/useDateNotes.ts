'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useDateNotes — Manages date-specific notes with automatic persistence.
 */
export function useDateNotes() {
  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load all notes once on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('calendar_date_notes');
      if (saved) {
        try {
          setNotesMap(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse calendar notes', e);
        }
      }
    }
  }, []);

  const saveNotes = useCallback((newMap: Record<string, string>) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('calendar_date_notes', JSON.stringify(newMap));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  }, []);

  const updateDateNote = useCallback((dateKey: string, text: string) => {
    setNotesMap(prev => {
      const next = { ...prev };
      if (text.trim() === '') {
        delete next[dateKey];
      } else {
        next[dateKey] = text;
      }

      // Debounced save
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        saveNotes(next);
      }, 800);

      return next;
    });
  }, [saveNotes]);

  return { notesMap, updateDateNote, isSaved };
}
