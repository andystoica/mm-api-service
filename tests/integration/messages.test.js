const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const { Message } = require('../../models/message');

describe('Messages API Routes /messages', () => {
  beforeEach(async () => {
    await Message.deleteMany({});
  });

  //
  it('POST to /messages creates a new message', async () => {
    const payload = {
      userId: '1234567890AB',
      message: 'Sample message',
      date: Date.now()
    };

    const response = await request(app)
      .post('/messages')
      .send(payload);

    assert.equal(response.body.message, 'Sample message');
  });

  //
  it('GET to /messages returns a list of all the messages', async () => {
    const response = await request(app).get('/messages');

    assert.equal(response.status, 200);
  });

  //
  it('GET to /messages/id returns a specific message', async () => {
    const response = await request(app).get('/messages/id');

    assert.equal(response.status, 200);
  });

  //
  it('PUT to /messages/id updates a specific message', async () => {
    const response = await request(app).put('/messages/id');

    assert.equal(response.status, 200);
  });

  //
  it('DELETE to /messages/id removes a specific message', async () => {
    const response = await request(app).delete('/messages/id');

    assert.equal(response.status, 200);
  });
});
