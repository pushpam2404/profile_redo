import type { Metric } from '@/content/types';

export function formatMetric(m: Metric, value = m.value): string {
  const n = m.decimals ? value.toFixed(m.decimals) : Math.round(value).toLocaleString('en-US');
  return `${m.prefix ?? ''}${n}${m.suffix ?? ''}`;
}
