exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('sites', (table) => {
      table.integer('id').primary();
      table.string('name');
      table.text('description');
      table.text('justification');
      table.integer('inscribed');
      table.string('category');
      table.decimal('size', 16);
      table.decimal('longitude', 16);
      table.decimal('latitude', 16);
      table.string('country_name');
      table.string('country_iso');
      table.string('region');
      table.integer('transboundary');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('users', (table) => {
      table.string('id').primary();
      table.string('email');
      table.string('first_name');
      table.string('last_name');
      table.string('token');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('visited', (table) => {
      table.integer('site_id');
      table.foreign('site_id').references('sites.id');
      table.string('user_id');
      table.foreign('user_id').references('users.id');
    }),
    knex.schema.createTable('favorites', (table) => {
      table.integer('site_id');
      table.foreign('site_id').references('sites.id');
      table.string('user_id');
      table.foreign('user_id').references('users.id');
    }),
    knex.schema.createTable('wants', (table) => {
      table.integer('site_id');
      table.foreign('site_id').references('sites.id');
      table.string('user_id');
      table.foreign('user_id').references('users.id');
    })
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('visited'),
    knex.schema.dropTable('favorites'),
    knex.schema.dropTable('wants'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('sites')
  ]);
