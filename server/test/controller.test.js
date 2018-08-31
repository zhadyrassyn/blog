const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Post} = require('./../models/post');

const posts = [
  {
    title: 'Post 1',
    content: 'Content 1',
    author: 'Author 1'
  },
  {
    title: 'Post 2',
    content: 'Content 2',
    author: 'Author 2'
  }
];

beforeEach(done => {
  Post.deleteMany().then(() => {
    Post.insertMany(posts)
  }).then(() => done())
});

describe('/GET /api/posts', () => {
  it('should get all posts', (done) => {
    request(app)
      .get('/api/posts')
      .expect(200)
      .expect(res => {
        expect(res.body.posts.length).toBe(2);
      })
      .end(done);
  });
});
