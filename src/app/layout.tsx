import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'mysaas — The Modern Dental Practice Management Platform',
  description:
    'Everything your clinic needs — patient records, scheduling, clinical notes, staff management, and analytics — unified in one beautiful dashboard.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-white text-text-heading antialiased">{children}</body>
    </html>
  );
}
