const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models/user');
const { Message } = require('../../models/message');

/**
 * TEST DATA and METHODS
 */
const testUser = { email: 'test@usera.com', name: 'Test User A', password: '1a2b3c' };
const testMessages = [
  { message: '1. Whatever you do, do it well. Walt Disney' },
  { message: '2. Everything you can imagine is real. Pablo Picasso' },
  { message: '3. He who has a why to live can bear almost any how. Friedrich Nietzsche' },
  { message: '4. What we think, we become. Buddha' },
  { message: '5. All limitations are self-imposed. Oliver Wendell Holmes' },
  { message: '6. Problems are not stop signs, they are guidelines. Robert H. Schiuller' },
  { message: '7. If you tell the truth you don’t have to remember anything. Mark Twain' },
  { message: '8. I could agree with you but then we’d both be wrong. Harvey Specter' },
  { message: '9. Be so good they can’t ignore you. Steve Martin' },
  { message: '10. I don’t need it to be easy, I need it to be worth it. Lil Wayne' }
];

const insertTestMessage = async () => {
  const user = await User.create({ ...testUser });
  const message = await Message.create({ ...testMessages[0], userId: user._id });
  return { user, message };
};

const insertTestMessages = async () => {
  const user = await User.create({ ...testUser });
  const userMessages = testMessages.map((message) => {
    return { message: message.message, userId: user._id };
  });
  const messages = await Message.insertMany(userMessages);
  return { user, messages };
};

/**
 * TEST SUITE for /messages API endpoint
 */
describe('API endpoint /messages', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Message.deleteMany({});
  });

  //
  it('POST to /messages creates a new message', async () => {
    const { user } = await insertTestMessage();

    const response = await request(app)
      .post('/messages')
      .send({ ...testMessages[0], userId: user._id });

    assert.equal(response.status, 201);
    assert.equal(response.body.message, testMessages[0].message);
  });

  //
  it('GET to /messages returns a list of all the messages', async () => {
    await insertTestMessages();

    const response = await request(app).get('/messages');
    assert.equal(response.status, 200);
    assert.equal(response.body.length, 10);
  });

  //
  it('GET to /messages?offset=5&limit=5 returns a list of 5 messages', async () => {
    await insertTestMessages();

    const response = await request(app).get('/messages?offset=5&limit=5');
    assert.equal(response.status, 200);
    assert.equal(response.body.length, 5);
  });

  //
  it('GET to /messages/{id} returns a specific message', async () => {
    const { message } = await insertTestMessage();
    const response = await request(app).get(`/messages/${message._id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.message, message.message);
  });

  //
  it('PUT to /messages/{id} updates a specific message', async () => {
    const { user, message } = await insertTestMessage();
    const response = await request(app)
      .put(`/messages/${message._id}`)
      .send({ message: testMessages[2].message, userId: message.userId });

    assert.equal(response.status, 200);
    assert.equal(response.body.message, testMessages[2].message);
  });

  //
  it('DELETE to /messages/{id} removes a specific message', async () => {
    const { message } = await insertTestMessage();

    const response = await request(app).delete(`/messages/${message._id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.message, message.message);
  });
});
