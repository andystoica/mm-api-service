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

const insertTestUser = async () => {
  const user = await User.create({ ...testUser });
  return { user };
};

/**
 * TEST SUITE for /users API endpoint
 */
describe('API endpoint /users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  //
  it('POST to /users creates a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ ...testUser });

    assert.equal(response.body.email, testUser.email);
    assert.equal(response.body.name, testUser.name);
  });

  //
  it('POST to /users to create an existing user returns status 400', async () => {
    await insertTestUser();

    response = await request(app)
      .post('/users')
      .send({ ...testUser });

    assert.equal(response.status, 400);
  });

  //
  it('GET to /users returns status 405', async () => {
    const response = await request(app)
      .get('/users')
      .send();

    assert.equal(response.status, 405);
  });

  //
  it('GET to /users/{id} returns the user account details', async () => {
    const { user } = await insertTestUser();

    const auth = await request(app)
      .post('/auth')
      .send(testUser);

    const response = await request(app)
      .get(`/users/${user._id}`)
      .set('x-auth-token', auth.body.token)
      .send();

    assert.equal(response.status, 200);
    assert.equal(response.body.email, user.email);
    assert.equal(response.body.name, user.name);
  });

  //
  it('GET to /users/{id} without auth token returns 401', async () => {
    const { user } = await insertTestUser();

    const response = await request(app)
      .get(`/users/${user._id}`)
      .send();

    assert.equal(response.status, 401);
  });

  //
  it('GET to /users/{id} with invalid ID returns 404', async () => {
    const response = await request(app).get(`/users/123`);
    assert.equal(response.status, 404);
  });

  //
  it('PUT to /users/{id} updates the user account', async () => {
    const { user } = await insertTestUser();

    const newUser = {
      password: testUser.password,
      name: 'Updated User',
      email: 'new@user.com',
      newPassword: '4d5e6f'
    };

    const auth = await request(app)
      .post('/auth')
      .send(testUser);

    const response = await request(app)
      .put(`/users/${user._id}`)
      .set('x-auth-token', auth.body.token)
      .send({ ...newUser });

    assert.equal(response.status, 200);
    assert.equal(response.body.email, newUser.email);
    assert.equal(response.body.name, newUser.name);
  });

  //
  it('PUT to /users/{id} without auth token returns 401', async () => {
    const { user } = await insertTestUser();

    const response = await request(app)
      .put(`/users/${user._id}`)
      .send(testUser);

    assert.equal(response.status, 401);
  });

  //
  it('PUT to /users/{id} with invalid ID returns 404', async () => {
    const response = await request(app).put(`/users/123`);
    assert.equal(response.status, 404);
  });

  //
  it('DELETE to /users/{id} removes the user account', async () => {
    const { user } = await insertTestUser();

    const auth = await request(app)
      .post('/auth')
      .send(testUser);

    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set('x-auth-token', auth.body.token)
      .send();

    assert.equal(response.status, 200);
    assert.equal(response.body.email, testUser.email);
    assert.equal(response.body.name, testUser.name);
  });

  //
  it('DELETE to /users/{id} with invalid ID returns 404', async () => {
    const response = await request(app).delete(`/users/123`);
    assert.equal(response.status, 404);
  });

  //
  it('DELETE to /users/{id} without auth token returns 401', async () => {
    const { user } = await insertTestUser();

    const response = await request(app).delete(`/users/${user._id}`);

    assert.equal(response.status, 401);
  });
});
