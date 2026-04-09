import { CalendarDay, MonthData } from '@/types/calendar';

export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Generate a full month grid (always 6 rows × 7 cols, Mon-Sun)
 */
export function generateMonthData(year: number, month: number): MonthData {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(year, month, 1);
  // getDay() returns 0=Sun...6=Sat. We want Mon=0...Sun=6
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6; // Sunday becomes last column

  const days: CalendarDay[] = [];

  // Fill leading days from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    d.setHours(0, 0, 0, 0);
    days.push({
      date: d,
      dayOfMonth: d.getDate(),
      isCurrentMonth: false,
      isToday: d.getTime() === today.getTime(),
    });
  }

  // Fill days of current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    date.setHours(0, 0, 0, 0);
    days.push({
      date,
      dayOfMonth: d,
      isCurrentMonth: true,
      isToday: date.getTime() === today.getTime(),
    });
  }

  // Fill trailing days to complete 6 rows (42 cells)
  const totalNeeded = 42;
  let nextDay = 1;
  while (days.length < totalNeeded) {
    const d = new Date(year, month + 1, nextDay++);
    d.setHours(0, 0, 0, 0);
    days.push({
      date: d,
      dayOfMonth: d.getDate(),
      isCurrentMonth: false,
      isToday: d.getTime() === today.getTime(),
    });
  }

  // Chunk into weeks
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < 42; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return { year, month, weeks };
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const [s, e] = start <= end ? [start, end] : [end, start];
  return date > s && date < e;
}

export function isRangeEdge(date: Date, start: Date | null, end: Date | null): {
  isStart: boolean;
  isEnd: boolean;
} {
  const isStart = start ? isSameDay(date, start) : false;
  const isEnd = end ? isSameDay(date, end) : false;
  return { isStart, isEnd };
}

export function formatDateKey(year: number, month: number): string {
  return `cal-notes-${year}-${String(month + 1).padStart(2, '0')}`;
}

export function getDayDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function getEffectiveRange(
  start: Date | null,
  end: Date | null,
  hover: Date | null
): { effectiveStart: Date | null; effectiveEnd: Date | null } {
  if (start && !end && hover) {
    const [s, e] = start <= hover ? [start, hover] : [hover, start];
    return { effectiveStart: s, effectiveEnd: e };
  }
  if (start && end) {
    const [s, e] = start <= end ? [start, end] : [end, start];
    return { effectiveStart: s, effectiveEnd: e };
  }
  return { effectiveStart: start, effectiveEnd: end };
}

export function getDayName(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}
