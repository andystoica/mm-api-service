const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const { Comment } = require('../../models/comment');

describe('Comment API Routes /comments', () => {
  beforeEach(async () => {
    await Comment.deleteMany({});
  });

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
});
