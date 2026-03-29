import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Yash Vardhan Singh — AI & ML Student',
  description:
    'Portfolio of Yash Vardhan Singh — AI & ML student learning and building strong foundations in tech. Exploring Computer Vision, Web Dev, and DSA.',
  keywords: [
    'AI',
    'Machine Learning',
    'portfolio',
    'OpenCV',
    'MediaPipe',
    'Yash Vardhan Singh',
    'Kota',
    'DSA',
    'Web Development'
  ],
  authors: [{ name: 'Yash Vardhan Singh' }],
  openGraph: {
    title: 'Yash Vardhan Singh — AI & ML Student',
    description:
      'I focus on understanding concepts deeply and improving step by step rather than rushing through things.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
