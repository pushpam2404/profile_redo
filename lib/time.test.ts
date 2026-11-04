import { it, expect } from 'vitest';
import { formatVizagTime } from './time';

it('formats Visakhapatnam time in 24h IST', () => {
  expect(formatVizagTime(new Date('2026-11-05T00:00:00Z'))).toBe('05:30 IST');
  expect(formatVizagTime(new Date('2026-11-05T15:04:00Z'))).toBe('20:34 IST');
});
