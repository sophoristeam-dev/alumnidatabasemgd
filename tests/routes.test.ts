import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { alumniPath, batchPath, routePaths } from '../src/routes.js';

describe('critical route model', () => {
  it('exposes deep-linkable explorer, record and batch routes', () => {
    assert.ok(routePaths.includes('/explore'));
    assert.ok(routePaths.includes('/alumni/:id'));
    assert.ok(routePaths.includes('/batches/:batchId'));
  });

  it('encodes route parameters', () => {
    assert.equal(batchPath('2025-26'), '/batches/2025-26');
    assert.equal(alumniPath('record 1'), '/alumni/record%201');
  });
});
