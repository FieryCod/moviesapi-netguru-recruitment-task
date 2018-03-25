const server = require('supertest').agent(process.env.BASE_URL)
const should = require('should')
const _ = require('lodash')

describe('controllers: moviesController', function () {
  describe('GET /movies', function () {
    it('should return exactly 6 movies', function (done) {
      server
        .get('/movies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.count.should.eql(6)
          res.body.rows.length.should.eql(6)
          done()
        })
    })

    it('should return exactly 2 movies for limit 2', function (done) {
      server
        .get('/movies?limit=2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.count.should.eql(6)
          res.body.rows.length.should.eql(2)
          done()
        })
    })

    it('should return exactly 4 movies offseted by 2', function (done) {
      server
        .get('/movies?offset=2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.count.should.eql(6)
          res.body.rows.length.should.eql(4)
          done()
        })
    })

    it('should return exactly 2 movies when limit is 2 and page is 2', function (done) {
      server
        .get('/movies?limit=2&page=2')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.count.should.eql(6)
          res.body.rows.length.should.eql(2)
          res.body.rows[0].title.should.eql('Love, Simon')
          res.body.rows[1].title.should.eql('Raid')
          done()
        })
    })
  })

  describe('POST/movies', function () {
    it('should post the movie and return it', function (done) {
      server
        .post('/movies')
        .send({ title: 'Robin Hood' })
        .set('Accept', /application\/json/)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.title.should.eql('Robin Hood')
          done()
        })
    })
  })
})
