const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const { Comment } = require('../../models/comment');

describe('Comment API Routes /comments', () => {
  beforeEach(async () => {
    await Comment.deleteMany({});
  });

  //
  it('POST to /comments creates a new comment', async () => {
    const payload = {
      userId: '1234567890AB',
      parentId: '1234567890CD',
      comment: 'Sample comment',
      date: Date.now()
    };

    const response = await request(app)
      .post('/comments')
      .send(payload);

    assert.equal(response.body.comment, 'Sample comment');
  });

  //
  it('GET to /comments returns all comments', async () => {
    const response = await request(app).get('/comments');

    assert.equal(response.status, 200);
  });

  //
  it('GET to /comments/id returns a specific comment', async () => {
    const response = await request(app).get('/comments/id');

    assert.equal(response.status, 200);
  });

  //
  it('PUT to /comments/id updates a specific comment', async () => {
    const response = await request(app).put('/comments/id');

    assert.equal(response.status, 200);
  });

  //
  it('DELETE to /comments/id removes a specific comment', async () => {
    const response = await request(app).delete('/comments/id');

    assert.equal(response.status, 200);
  });
});
