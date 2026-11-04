import { it, expect } from 'vitest';
import { nextProject, getProject } from './helpers';

it('nextProject wraps from last to first', () => {
  expect(nextProject('scrollo').slug).toBe('threat-detection');
  expect(nextProject('threat-detection').slug).toBe('orbitune');
});

it('getProject returns undefined for unknown slugs', () => {
  expect(getProject('nope')).toBeUndefined();
  expect(getProject('sluice')?.title).toBe('Sluice');
});
