const assert = require('assert');
const request = require('supertest');
const app = require('../app');

/**
 * TEST SUITE for API main endpoint
 */
describe('Express Server', () => {
  it('Handles a GET request to /users', async () => {
    const response = await request(app).get('/users');

    assert.equal(response.status, 405);
  });

  it('Handles a GET request to /messages', async () => {
    const response = await request(app).get('/messages');

    assert.equal(response.status, 200);
  });

  it('Handles a GET request to /comments', async () => {
    const response = await request(app).get('/comments');

    assert.equal(response.status, 200);
  });
});
