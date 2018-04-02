exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('items', function(table) {
      table.increments('id').primary();
      table.string('item');
      table.boolean('not_packed');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('items')
  ]);
};
