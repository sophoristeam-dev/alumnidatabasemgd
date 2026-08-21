import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { alumniRecords } from '../src/data/public/alumni.js';
import { filterRecords, getAverageScore, getBatchRecords, getFieldDistribution, getOverseasPercentage } from '../src/data/selectors.js';

describe('derived analytics', () => {
  it('filters batches and text queries from one source of truth', () => {
    const batch = getBatchRecords(alumniRecords, '2026');
    assert.ok(batch.length > 0);
    assert.ok(batch.every((record) => record.batch === '2026'));
    assert.ok(filterRecords(alumniRecords, { query: 'economics' }).length > 0);
  });

  it('derives scores, distributions and overseas share', () => {
    const records = getBatchRecords(alumniRecords, '2021');
    assert.ok((getAverageScore(records) ?? 0) > 0);
    assert.ok((getOverseasPercentage(records) ?? 0) > 0);
    assert.equal(getFieldDistribution(alumniRecords).reduce((sum, item) => sum + item.count, 0), alumniRecords.length);
  });

  it('does not represent absent values as zero', () => {
    assert.equal(getAverageScore([]), undefined);
    assert.equal(getOverseasPercentage([]), undefined);
  });
});
