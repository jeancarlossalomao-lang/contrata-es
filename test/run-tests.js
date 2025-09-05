import assert from 'node:assert/strict';
import { groupByYear } from '../src/data.js';

const sample = [
  { date: '2023-01-15' },
  { date: '2023-05-01' },
  { date: '2024-07-01' }
];

const result = groupByYear(sample);

assert.deepEqual(result, { '2023': 2, '2024': 1 });

console.log('All tests passed');
