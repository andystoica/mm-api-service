const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('Handles a GET request to /users', async () => {
    const res = await request(app).get('/users');

    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'ok');
  });

  it('Handles a GET request to /messages', async () => {
    const res = await request(app).get('/messages');

    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'ok');
  });

  it('Handles a GET request to /comments', async () => {
    const res = await request(app).get('/comments');

    assert.equal(res.status, 200);
    assert.equal(res.body.message, 'ok');
  });
});
