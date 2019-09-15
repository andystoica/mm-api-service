const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const { User } = require('../models/user');
const { Message } = require('../models/message');
const { Comment } = require('../models/comment');

/**
 * TEST DATA and METHODS
 */
const testUsers = [
  { email: 'test@usera.com', name: 'Test User A', password: '1a2b3c' },
  { email: 'test@userb.com', name: 'Test User B', password: '4d5e6f' }
];
const testMessages = [
  { message: '1. Whatever you do, do it well. - Walt Disney' },
  { message: '2. Everything you can imagine is real. - Pablo Picasso' },
  { message: '3. He who has a why to live can bear almost any how. - Friedrich Nietzsche' }
];
const testComments = [
  { comment: '1. Lorem ipsum is dummy text used in laying out print, graphic or web designs.' },
  { comment: '2. The passage is attributed to an unknown typesetter in the 15th century.' },
  { comment: '3. The purpose of lorem ipsum is to create a natural looking block of text.' },
  { comment: '4. Letraset used it on their dry-transfer sheets during the 90s.' }
];

const insertTestComment = async () => {
  const user = await User.create({ ...testUsers[0] });
  const message = await Message.create({ ...testMessages[0], userId: user._id });
  const comment = await Comment.create({ ...testComments[0], userId: user._id, parentId: message._id });
  return { user, message, comment };
};

const insertTestComments = async () => {
  const users = await User.insertMany(testUsers);
  const messages = await Message.insertMany([
    { ...testMessages[0], userId: users[0]._id },
    { ...testMessages[1], userId: users[1]._id },
    { ...testMessages[2], userId: users[1]._id }
  ]);
  const comments = await Comment.insertMany([
    { ...testComments[0], userId: users[0]._id, parentId: messages[1]._id },
    { ...testComments[1], userId: users[0]._id, parentId: messages[1]._id },
    { ...testComments[2], userId: users[1]._id, parentId: messages[1]._id },
    { ...testComments[3], userId: users[1]._id, parentId: messages[2]._id }
  ]);
  return { users, messages, comments };
};

/**
 * TEST SUITE for /comments API endpoint
 */
describe('API endpoint /comments', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Message.deleteMany({});
    await Comment.deleteMany({});
  });

  //
  it('POST to /comments creates a new comment', async () => {
    const { user, message } = await insertTestComment();

    const response = await request(app)
      .post('/comments')
      .send({ ...testComments[1], userId: user._id, parentId: message._id });

    assert.equal(response.status, 201);
    assert.equal(response.body.comment, testComments[1].comment);
  });

  //
  it('GET to /comments returns all comments', async () => {
    const { users, messages, comments } = await insertTestComments();
    const response = await request(app).get('/comments');

    assert.equal(response.status, 200);
    assert.equal(response.body.length, testComments.length);
  });

  //
  it('GET to /comments?offset=2&limit=2 returns a list of 2 comments', async () => {
    const { users, messages, comments } = await insertTestComments();
    const response = await request(app).get('/comments?offset=2&limit=2');

    assert.equal(response.status, 200);
    assert.equal(response.body.length, 2);
  });

  //
  it('GET to /comments/{id} returns a specific comment', async () => {
    const { comment } = await insertTestComment();
    const response = await request(app).get(`/comments/${comment._id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.comment, comment.comment);
  });

  //
  it('GET to /comments/{id} with invalid ID returns 404', async () => {
    const response = await request(app).get(`/comments/123`);
    assert.equal(response.status, 404);
  });

  //
  it('PUT to /comments/{id} updates a specific comment', async () => {
    const { comment } = await insertTestComment();
    const response = await request(app)
      .put(`/comments/${comment._id}`)
      .send({
        userId: comment.userID,
        parentId: comment.parentId,
        comment: testComments[1].comment
      });

    assert.equal(response.status, 200);
    assert.equal(response.body.comment, testComments[1].comment);
  });

  //
  it('PUT to /comments/{id} with invalid ID returns 404', async () => {
    const response = await request(app).put(`/comments/123`);
    assert.equal(response.status, 404);
  });

  //
  it('DELETE to /comments/{id} removes a specific comment', async () => {
    const { comment } = await insertTestComment();
    const response = await request(app).delete(`/comments/${comment._id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.comment, comment.comment);
  });

  //
  it('DELETE to /comments/{id} with invalid ID returns 404', async () => {
    const response = await request(app).delete(`/comments/123`);
    assert.equal(response.status, 404);
  });
});
