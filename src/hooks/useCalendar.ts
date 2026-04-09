'use client';

import { useState, useCallback } from 'react';
import { DateRange, SelectionPhase } from '@/types/calendar';

interface UseCalendarReturn {
  currentYear: number;
  currentMonth: number;
  range: DateRange;
  hoverDate: Date | null;
  phase: SelectionPhase;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  setMonthView: (year: number, month: number) => void;
  handleDateClick: (date: Date, onRangeComplete?: (start: Date, end: Date) => void) => void;
  handleDateHover: (date: Date | null) => void;
  clearRange: () => void;
}

export function useCalendar(): UseCalendarReturn {
  const now = new Date();
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [phase, setPhase] = useState<SelectionPhase>('idle');

  const goToPrevMonth = useCallback(() => {
    setView(prev => {
      const isJan = prev.month === 0;
      return {
        year: isJan ? prev.year - 1 : prev.year,
        month: isJan ? 11 : prev.month - 1
      };
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setView(prev => {
      const isDec = prev.month === 11;
      return {
        year: isDec ? prev.year + 1 : prev.year,
        month: isDec ? 0 : prev.month + 1
      };
    });
  }, []);

  const setMonthView = useCallback((year: number, month: number) => {
    setView({ year, month });
  }, []);

  const handleDateClick = useCallback((date: Date, onRangeComplete?: (start: Date, end: Date) => void) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Block clicks on past dates
    if (date < today) return;

    if (phase === 'idle') {
      // First click → set start
      setRange({ start: date, end: null });
      setPhase('selecting');
    } else {
      // Second click → set end (or swap if needed)
      const start = range.start!;
      if (date.getTime() === start.getTime()) {
        // Clicking same date resets
        setRange({ start: null, end: null });
        setPhase('idle');
        return;
      }
      const [s, e] = date < start ? [date, start] : [start, date];
      setRange({ start: s, end: e });
      setPhase('idle');
      
      // Notify completion
      if (onRangeComplete) {
        onRangeComplete(s, e);
      }
    }
  }, [phase, range.start]);

  const handleDateHover = useCallback((date: Date | null) => {
    setHoverDate(date);
  }, []);

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
    setPhase('idle');
    setHoverDate(null);
  }, []);

  return {
    currentYear: view.year,
    currentMonth: view.month,
    range,
    hoverDate,
    phase,
    goToPrevMonth,
    goToNextMonth,
    setMonthView,
    handleDateClick,
    handleDateHover,
    clearRange,
  };
}
