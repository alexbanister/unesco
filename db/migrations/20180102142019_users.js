exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.alterTable('users', (table) => {
      table.renameColumn('first_name', 'name');
      table.dropColumn('last_name');
    })
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.alterTable('users', (table) => {
      table.renameColumn('name', 'first_name');
      table.string('last_name');
    })
  ]);
