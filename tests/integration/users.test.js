const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models/user');

const testUser = {
  email: 'test@user.com',
  name: 'Test User',
  password: '1a2b3c'
};

describe('Users API Routes /users', () => {
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
    let response = await request(app)
      .post('/users')
      .send({ ...testUser });

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
  it('GET to /users/id returns the user account details', async () => {
    const responseA = await request(app)
      .post('/users')
      .send({ ...testUser });

    const responseB = await request(app)
      .get(`/users/${responseA.body._id}`)
      .send();

    assert.equal(responseB.status, 200);
    assert.equal(responseB.body.email, testUser.email);
    assert.equal(responseB.body.name, testUser.name);
  });

  //
  it('PUT to /users/id updates the user account', async () => {
    const responseA = await request(app)
      .post('/users')
      .send({ ...testUser });

    const newUser = {
      password: testUser.password,
      name: 'Updated User',
      email: 'new@user.com',
      newPassword: '4d5e6f'
    };

    const responseB = await request(app)
      .put(`/users/${responseA.body._id}`)
      .send({ ...newUser });

    assert.equal(responseB.status, 200);
    assert.equal(responseB.body.email, newUser.email);
    assert.equal(responseB.body.name, newUser.name);
  });

  //
  it('DELETE to /users/id removes the user account', async () => {
    const responseA = await request(app)
      .post('/users')
      .send({ ...testUser });

    const response = await request(app)
      .delete(`/users/${responseA.body._id}`)
      .send();

    assert.equal(response.status, 200);
    assert.equal(response.body.email, testUser.email);
    assert.equal(response.body.name, testUser.name);
  });
});
