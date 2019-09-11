const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models/user');

describe('Users API Routes /users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  //
  it('POST to /users creates a new user', async () => {
    const payload = {
      email: 'user@test.com',
      username: 'Test',
      password: '123test'
    };

    const response = await request(app)
      .post('/users')
      .send(payload);

    assert.equal(response.body.email, 'user@test.com');
    assert.equal(response.body.username, 'Test');
  });

  //
  it('GET to /users returns 405 - Method Not Allowed', async () => {
    const response = await request(app)
      .get('/users')
      .send();

    assert.equal(response.status, 405);
  });

  //
  it('PUT to /users/id updates the user account', async () => {
    const response = await request(app)
      .put('/users/id')
      .send();

    assert.equal(response.status, 200);
  });

  //
  it('DELETE to /users/id removes the user account', async () => {
    const response = await request(app)
      .delete('/users/id')
      .send();

    assert.equal(response.status, 200);
  });
});
