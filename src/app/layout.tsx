import type { Metadata } from 'next';
import { Inter, Outfit, Playfair_Display, Caveat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TUF Wall Calendar — Interactive Date Range Picker',
  description:
    'A polished, interactive wall calendar component with date range selection, notes, and dark mode. Built with Next.js and TypeScript.',
  keywords: ['calendar', 'date picker', 'wall calendar', 'date range', 'react', 'nextjs'],
  openGraph: {
    title: 'TUF Wall Calendar',
    description: 'Interactive wall calendar with date range selection and notes',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} font-inter antialiased`}>
        {children}
      </body>
    </html>
  );
}
