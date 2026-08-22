import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { dedupeRecords, normalizeInstitution, parsePercentage, validatePublicData } from '../src/data/normalize.js';
import { alumniRecords } from '../src/data/public/alumni.js';

describe('public data normalization', () => {
  it('parses valid percentages without inventing invalid values', () => {
    assert.equal(parsePercentage('91.4%'), 91.4);
    assert.equal(parsePercentage(''), undefined);
    assert.equal(parsePercentage('101%'), undefined);
  });

  it('normalizes only explicit institution aliases', () => {
    assert.equal(normalizeInstitution(' DU '), 'University of Delhi');
    assert.equal(normalizeInstitution('University   of   Rajasthan'), 'University of Rajasthan');
  });

  it('removes duplicate public records and validates the boundary', () => {
    assert.equal(dedupeRecords([...alumniRecords, alumniRecords[0]]).length, alumniRecords.length);
    assert.equal(validatePublicData(alumniRecords).length, alumniRecords.length);
  });
});
