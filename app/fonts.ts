import { Anton, Instrument_Serif, Inter_Tight, JetBrains_Mono } from 'next/font/google';

export const display = Anton({ weight: '400', subsets: ['latin'], variable: '--f-display', display: 'swap' });
export const serif = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--f-serif', display: 'swap' });
export const sans = Inter_Tight({ weight: ['400', '600', '900'], subsets: ['latin'], variable: '--f-sans', display: 'swap' });
export const mono = JetBrains_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--f-mono', display: 'swap' });
