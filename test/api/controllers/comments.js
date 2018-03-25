const server = require('supertest').agent(process.env.BASE_URL)
const should = require('should')
const _ = require('lodash')

describe('controllers: commentsController', function () {
  describe('GET /comments', function () {
    it('should return the comments for the proper movie uuid', function (done) {
      server
        .get('/comments?movieUuid=fef86f40-303e-11e8-8a8b-9decff9c5795')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.count.should.eql(2)
          res.body.rows.length.should.eql(2)
          done()
        })
    })

    it('should return exactly 4 comments', function (done) {
      server
        .get('/comments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.count.should.eql(4)
          res.body.rows.length.should.eql(4)
          done()
        })
    })

    it('should return exactly 2 comments for limit 2', function (done) {
      server
        .get('/comments?limit=2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.count.should.eql(4)
          res.body.rows.length.should.eql(2)
          done()
        })
    })

    it('should return exactly 2 comments offseted by 2', function (done) {
      server
        .get('/comments?offset=2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.count.should.eql(4)
          res.body.rows.length.should.eql(2)
          done()
        })
    })

    it('should return exactly 2 comments when limit is 2 and page is 2', function (done) {
      server
        .get('/comments?limit=2&page=2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.count.should.eql(4)
          res.body.rows.length.should.eql(0)
          done()
        })
    })
  })

  describe('POST /comments', function () {
    it('should post the movie and return it', function (done) {
      server
        .post('/comments')
        .send({
	        movieUuid: 'fef86f40-303e-11e8-8a8b-9decff9c5795',
          text: 'That movie is really nice'
        })
        .set('Accept', /application\/json/)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.text.should.eql('That movie is really nice')
          done()
        })
    })
  })
})
