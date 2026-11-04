import type { Metadata, Viewport } from 'next';
import { display, serif, sans, mono } from './fonts';
import { Grain } from '@/components/Grain';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://profile-redo.vercel.app'),
  title: 'Pushpam Raj Satyarthi — Software Engineer',
  description:
    'CSE student at GITAM who goes deep on backend and data systems, and ships whatever else the product needs. Open to SDE roles.',
};

export const viewport: Viewport = { themeColor: '#e9e7e2' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <Grain />
      </body>
    </html>
  );
}
