exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.alterTable('users', (table) => {
      table.string('facebook_token');
      table.string('twitter_token');
    }),
    knex.schema.alterTable('sites', (table) => {
      table.string('image');
    })
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.alterTable('users', (table) => {
      table.dropColumn('facebook_token');
      table.dropColumn('twitter_token');
    }),
    knex.schema.alterTable('sites', (table) => {
      table.dropColumn('image');
    })
  ]);
