const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach(function(done) {
    database.migrate.rollback()
    .then(function() {
      database.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  describe('GET /api/v1/items', () => {
    it('should get all items', () => {
      return chai.request(server)
      .get('/api/v1/items')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('item');
        response.body[0].should.have.property('created_at');
        response.body[0].should.have.property('updated_at');
        response.body[0].should.have.property('not_packed');
      })
      .catch(error => { throw error });
    })

    it('should return a 404 status if nonexistent', () => {
      return chai.request(server)
      .get('/api/v1/nonexistent')
      .then(response => { response.should.have.status(404) })
      .catch(error => { throw error });
    })
  })

  describe('POST /api/v1/items', () => {
    it('should post an item', () => {
      return chai.request(server)
      .post('/api/v1/items')
      .send({
        item: 'new item'
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('item');
        response.body.item.should.equal('new item');
      })
    })

    it('should return a 404 status if nonexistent', () => {
      return chai.request(server)
      .get('/api/v1/nonexistent')
      .then(response => { response.should.have.status(404) })
      .catch(error => { throw error });
    })
  })

  describe('DELETE /api/v1/items/:id', () => {
    it('should delete an item', () => {
      return chai.request(server)
      .delete('/api/v1/items/1')
      .then(response => { response.should.have.status(204) })
    })
  })
})
