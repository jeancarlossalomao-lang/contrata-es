import { describe, it, expect } from 'vitest';
import { groupByYear } from '../src/data.js';

describe('groupByYear', () => {
  it('groups contracts by year', () => {
    const input = [
      { date: '2023-01-15' },
      { date: '2023-05-01' },
      { date: '2024-07-01' }
    ];
    const result = groupByYear(input);
    expect(result).toEqual({ '2023': 2, '2024': 1 });
  });
});
