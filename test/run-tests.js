import assert from 'node:assert/strict';
import { groupByYear, topSuppliers } from '../src/data.js';

const sample = [
  { value: 1000, date: '2023-01-15', supplier: 'A' },
  { value: 2000, date: '2023-02-20', supplier: 'B' },
  { value: 1500, date: '2024-03-10', supplier: 'A' }
];

assert.deepEqual(groupByYear(sample), { '2023': 3000, '2024': 1500 });
assert.deepEqual(topSuppliers(sample, 2), { 'A': 2500, 'B': 2000 });

console.log('All tests passed');
