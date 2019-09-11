const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/user');

describe('Users Controller', () => {
  it('POST to /users creates a new user', async () => {
    const beforeCount = await User.countDocuments();
    const res = await request(app)
      .post('/users')
      .send({ email: 'user@test.com', username: 'Test', password: '123test' });
    const afterCount = await User.countDocuments();

    assert.equal(afterCount, beforeCount + 1);
  });
});
