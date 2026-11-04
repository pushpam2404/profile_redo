import { it, expect } from 'vitest';
import { formatMetric } from './format';

it('formats metrics with separators, decimals and affixes', () => {
  expect(formatMetric({ value: 101000, suffix: '+', label: '', source: 'resume' })).toBe('101,000+');
  expect(formatMetric({ value: 9.17, decimals: 2, label: '', source: 'resume' })).toBe('9.17');
  expect(formatMetric({ value: 23, prefix: '+', label: '', source: 'resume' })).toBe('+23');
  expect(formatMetric({ value: 30, prefix: '−', suffix: '%', label: '', source: 'resume' }, 15.4)).toBe('−15%');
});
