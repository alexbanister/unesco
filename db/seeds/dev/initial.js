const sites = require('../../../sites.js');

exports.seed = (knex) => {
  return knex('sites').del()
    .then(() => {
      return knex('sites').insert(sites);
    });
};
