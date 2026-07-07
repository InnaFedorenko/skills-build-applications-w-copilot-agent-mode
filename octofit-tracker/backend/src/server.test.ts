import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from './server';

test('health endpoint returns server status', async () => {
  const app = createApp();

  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
});

test('users endpoint returns a collection', async () => {
  const app = createApp();

  const response = await request(app).get('/api/users');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});
