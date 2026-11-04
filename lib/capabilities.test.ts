import { describe, it, expect } from 'vitest';
import { canRunLive3D } from './capabilities';

describe('canRunLive3D', () => {
  it.each([
    [1440, 8, false, true, true],
    [767, 8, false, true, false],
    [1440, 4, false, true, false],
    [1440, 8, true, true, false],
    [1440, 8, false, false, false],
  ])('width %i cores %i reduced %s gpu %s → %s', (width, cores, reducedMotion, hasGPU, expected) => {
    expect(canRunLive3D({ width, cores, reducedMotion, hasGPU })).toBe(expected);
  });
});
