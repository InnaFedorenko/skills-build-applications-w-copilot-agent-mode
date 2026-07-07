import test from 'node:test';
import assert from 'node:assert/strict';
import supertest from 'supertest';
import { createApp } from './app';

test('GET /api/health returns status ok', async () => {
  const app = createApp();
  const response = await supertest(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
});

test('GET /api/users/ returns seeded payload', async () => {
  const app = createApp();
  const response = await supertest(app).get('/api/users/');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body.users));
});
