const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const { User } = require('../models/user');

/**
 * TEST DATA and METHODS
 */
const testUser = {
  email: 'test@user.com',
  name: 'Test User',
  password: '1a2b3c'
};

/**
 * TEST SUITE for /auth API endpoint
 */
describe('Authentication Middleware', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  //
  it('Valid POST to /auth returns JWT token', async () => {
    const user = await User.create(testUser);

    const response = await request(app)
      .post('/auth')
      .send(testUser);

    assert.equal(response.status, 200);
    assert(response.body.token !== undefined);
  });

  //
  it('Invalid POST to /auth returns 400 error', async () => {
    const user = await User.create(testUser);

    const response = await request(app)
      .post('/auth')
      .send({ ...testUser, password: 'invalid' });

    assert.equal(response.status, 400);
    assert(response.body.token === undefined);
  });

  //
  it('Accessing a restricted route without a token returns 401', async () => {
    const user = await User.create(testUser);

    const response = await request(app).get(`/users/${user._id}`);

    assert.equal(response.status, 401);
  });

  //
  it('Accessing a restricted route with an invalid token returns 400', async () => {
    const user = await User.create(testUser);

    const response = await request(app)
      .get(`/users/${user._id}`)
      .set('x-auth-token', 'invalid_token');

    assert.equal(response.status, 400);
  });
});
