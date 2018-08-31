const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Post} = require('./../models/post');

const posts = [
  {
    _id: new ObjectID(),
    title: 'Post 1',
    content: 'Content 1',
    author: 'Author 1'
  },
  {
    _id: new ObjectID(),
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

describe('/GET /api/posts/:id', () => {
  it('should get the post', (done) => {
    const id = posts[0]._id.toHexString();
    request(app)
      .get(`/api/posts/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.post._id).toBe(id);
      })
      .end(done)
  });
});

describe('/PUT /api/posts', () => {
  it('should save a post', (done) => {
    const data = {
      _id: new ObjectID(),
      title: 'Title 3',
      content: 'Content 3',
      author: 'Author 3'
    }

    request(app)
      .put('/api/posts')
      .send(data)
      .expect(201)
      .expect(({body}) => {
        expect(body.title).toBe(data.title);
        expect(body.content).toBe(data.content);
        expect(typeof body.date).toBe('string');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Post.find().then(posts => {
          expect(posts.length).toBe(3);
          done();
        }).catch(err => done(err))
      });
  })
});
