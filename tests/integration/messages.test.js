const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const { Message } = require('../../models/message');

describe('Messages API Routes /messages', () => {
  beforeEach(async () => {
    await Message.deleteMany({});
  });

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
});
