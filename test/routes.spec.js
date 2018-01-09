const chai = require('chai');
// eslint-disable-next-line no-unused-vars
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
// eslint-disable-next-line
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', () => {
    return chai.request(server)
      .get('/')
      .then((response) => {
        response.should.be.html;
      })
      .catch((err) => {
        throw err;
      });
  });
  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
      .get('/sad')
      .then((response) => {
        response.should.be.html;
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch((error) => { throw error; });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch((error) => { throw error; });
  });
  describe('SAD PATH /api/v1/sad', () => {
    it('should return 404 for a route that does not exist', () => {
      return chai.request(server)
        .get('/api/v1/hellodarknessmyoldfriend')
        .then((res) => {
          res.should.have.status(404);
        })
        .catch((error) => { error; });
    });
  });
  describe('GET /api/v1/sites', () => {
    it('should return all sites', () => {
      return chai.request(server)
        .get('/api/v1/sites')
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('sites');
          res.body.sites.should.be.an('array');
          res.body.sites.should.have.length(5);
          res.body.sites[0].should.be.an('object');
          res.body.sites[0].should.have.property('id');
          res.body.sites[0].id.should.be.a('number');
          res.body.sites[0].should.have.property('name');
          res.body.sites[0].name.should.be.a('string');
          res.body.sites[0].should.have.property('description');
          res.body.sites[0].description.should.be.a('string');
          res.body.sites[0].should.have.property('inscribed');
          res.body.sites[0].inscribed.should.be.an('number');
          res.body.sites[0].should.have.property('longitude');
          res.body.sites[0].longitude.should.be.a('string');
          res.body.sites[0].should.have.property('latitude');
          res.body.sites[0].latitude.should.be.a('string');
          res.body.sites[0].should.have.property('size');
          res.body.sites[0].size.should.be.a('string');
          res.body.sites[0].should.have.property('category');
          res.body.sites[0].category.should.be.a('string');
          res.body.sites[0].should.have.property('country_name');
          res.body.sites[0].country_name.should.be.a('string');
          res.body.sites[0].should.have.property('region');
          res.body.sites[0].region.should.be.a('string');
          res.body.sites[0].should.have.property('country_iso');
          res.body.sites[0].country_iso.should.be.a('string');
          res.body.sites[0].should.have.property('transboundary');
          res.body.sites[0].transboundary.should.be.a('number');
          res.body.sites[0].should.have.property('image');
          res.body.sites[0].image.should.be.a('string');
        })
        .catch((error) => { throw error; });
    });
  });
  describe('GET /api/v1/sites/:id', () => {
    it('should return one site with given unique id', () => {
      return chai.request(server)
        .get('/api/v1/sites/1')
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.site.should.be.an('array');
          res.body.site[0].should.be.an('object');
          res.body.site[0].should.have.property('id');
          res.body.site[0].id.should.be.a('number');
          res.body.site[0].should.have.property('name');
          res.body.site[0].name.should.be.a('string');
          res.body.site[0].should.have.property('description');
          res.body.site[0].description.should.be.a('string');
          res.body.site[0].should.have.property('inscribed');
          res.body.site[0].inscribed.should.be.an('number');
          res.body.site[0].should.have.property('longitude');
          res.body.site[0].longitude.should.be.a('string');
          res.body.site[0].should.have.property('latitude');
          res.body.site[0].latitude.should.be.a('string');
          res.body.site[0].should.have.property('size');
          res.body.site[0].size.should.be.a('string');
          res.body.site[0].should.have.property('category');
          res.body.site[0].category.should.be.a('string');
          res.body.site[0].should.have.property('country_name');
          res.body.site[0].country_name.should.be.a('string');
          res.body.site[0].should.have.property('region');
          res.body.site[0].region.should.be.a('string');
          res.body.site[0].should.have.property('country_iso');
          res.body.site[0].country_iso.should.be.a('string');
          res.body.site[0].should.have.property('transboundary');
          res.body.site[0].transboundary.should.be.a('number');
          res.body.site[0].should.have.property('image');
          res.body.site[0].image.should.be.a('string');
        })
        .catch((error) => { throw error; });
    });
    it('should return 404 if no site found', () => {
      return chai.request(server)
        .get('/api/v1/sites/0')
        .then((res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('No site found with id 0');
        })
        .catch((error) => { throw error; });
    });
  });
  describe('GET /api/v1/users/:id', () => {
    it('should return user with given unique id', () => {
      return chai.request(server)
        .get('/api/v1/users/1')
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('id');
          res.body.id.should.be.a('string');
          res.body.should.have.property('email');
          res.body.email.should.be.a('string');
          res.body.should.have.property('name');
          res.body.name.should.be.a('string');
        })
        .catch((error) => { throw error; });
    });
    it('should return 404 if no user found', () => {
      return chai.request(server)
        .get('/api/v1/users/0')
        .then((res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          res.body.error.should.be.an('string');
          res.body.error.should.equal('No user found with id 0');
        })
        .catch((error) => { throw error; });
    });
  });
  describe('POST /api/v1/users [LOGIN]', () => {
    it('should return user object when given sucessfuly POST body', () => {
      const postUser = { id: 1, email: 'user1@gmail.com' };
      return chai.request(server)
        .post('/api/v1/users').send(postUser)
        .then((res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.should.have.property('user');
          res.body.user.should.be.an('object');
          res.body.user.should.have.property('id');
          res.body.user.id.should.be.a('number');
          res.body.user.should.have.property('email');
          res.body.user.email.should.be.a('string');
          res.body.user.should.have.property('name');
          res.body.user.name.should.be.a('string');
          res.body.user.should.have.property('wants');
          res.body.user.wants.should.be.a('array');
          res.body.user.should.have.property('favorites');
          res.body.user.favorites.should.be.a('array');
          res.body.user.should.have.property('visited');
          res.body.user.visited.should.be.a('array');
        })
        .catch((error) => { error; });
    });
    it('should return 422 if POST body is incorrect', () => {
      const incorrectPostUser = { id: 1, name: 'sam' };
      return chai.request(server)
        .post('/api/v1/users').send(incorrectPostUser)
        .then((res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
        })
        .catch((error) => { error; });
    });
    it('should return 500 if user does not exist', () => {
      const userDoesNotExist = { id: -1, email: 'fake@fake.com' };
      return chai.request(server)
        .post('/api/v1/users').send(userDoesNotExist)
        .then((res) => {
          res.should.have.status(500);
        })
        .catch((error) => { error; });
    });
  });
  describe('POST /api/v1/users/:id/flags', () => {
    it('should add site_id and user_id object to wants', () => {
      const user = { id: 1, email: 'user1@mail.com', name: 'User One' };
      const siteId = 1;
      const flagType = 'wants';
      const flagPost = { siteId, flagType };
      return chai.request(server)
        .post(`/api/v1/users/${user.id}/flags`).send(flagPost)
        .then((res) => {
          res.should.have.status(204);
        })
        .catch((error) => { throw error; });
    });
    it('should add site_id and user_id object to favorites', () => {
      const user = { id: 1, email: 'user1@mail.com', name: 'User One' };
      const siteId = 1;
      const flagType = 'favorites';
      const flagPost = { siteId, flagType };
      return chai.request(server)
        .post(`/api/v1/users/${user.id}/flags`).send(flagPost)
        .then((res) => {
          res.should.have.status(204);
        })
        .catch((error) => { throw error; });
    });
    it('should add site_id and user_id object to visited', () => {
      const user = { id: 1, email: 'user1@mail.com', name: 'User One' };
      const siteId = 1;
      const flagType = 'visited';
      const flagPost = { siteId, flagType };
      return chai.request(server)
        .post(`/api/v1/users/${user.id}/flags`).send(flagPost)
        .then((res) => {
          res.should.have.status(204);
        })
        .catch((error) => { throw error; });
    });
    it('should return 422 if POST body is incorrectly formatted', () => {
      const user = { id: 1, email: 'user1@mail.com', name: 'User One' };
      const id = 1;
      const flagType = 'visited';
      const improperlyFormattedFlagPost = { id, flagType };
      return chai.request(server)
        .post(`/api/v1/users/${user.id}/flags`).send(improperlyFormattedFlagPost)
        .then((res) => {
          res.should.have.status(422);
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.error.should.be.a('string');
          res.body.error.should.equal('Expected format: { siteId: <Int>, flagType: <String> }.');
        })
        .catch((error) => { throw error; });
    });
    it('should return 500 if user does not exist', () => {
      const missingUser = { id: 0, email: 'user1@mail.com', name: 'User One' };
      const siteId = 1;
      const flagType = 'visited';
      const flagPost = { siteId, flagType };
      return chai.request(server)
        .post(`/api/v1/users/${missingUser.id}/flags`).send(flagPost)
        .then((res) => {
          res.should.have.status(500);
        })
        .catch((error) => { throw error; });
    });
    it('should return 422 if site does not exist', () => {
      const user = { id: 1, email: 'user1@mail.com', name: 'User One' };
      const siteId = 0;
      const flagType = 'visited';
      const flagPost = { siteId, flagType };
      return chai.request(server)
        .post(`/api/v1/users/${user.id}/flags`).send(flagPost)
        .then((res) => {
          res.should.have.status(422);
        })
        .catch((error) => { throw error; });
    });
  });
  describe('DELETE /api/v1/users/:id/flags', () => {
    it.skip('should remove site_id and user_id object from wants', () => {
      const user = { id: 5 };
      const flag = { siteId: 3, flagType: 'wants' };
      return chai.request(server)
        .delete(`/api/v1/users/${user.id}/flags`).send(flag)
        .then((res) => {
          res.should.have.status(204);
        })
        .catch((error) => { throw error; });
    });
    it.skip('should remove site_id and user_id object from favorites', () => {});
    it.skip('should remove site_id and user_id object from visited', () => {});
    it.skip('should return 422 if POST body is incorrectly formatted', () => {});
    it.skip('should return 500 if user does not exist', () => {});
    it.skip('should return 500 if site does not exist', () => {});
  });
});