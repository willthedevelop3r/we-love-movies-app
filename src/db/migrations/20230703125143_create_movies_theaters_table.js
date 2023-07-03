exports.up = function (knex) {
  return knex.schema.createTable('movies_theaters', (table) => {
    table
      .integer('movie_id')
      .unsigned()
      .references('movies.movie_id')
      .onDelete('CASCADE');
    table
      .integer('theater_id')
      .unsigned()
      .references('theaters.theater_id')
      .onDelete('CASCADE');
    table.boolean('is_showing').defaultTo(false);
    // table.primary(['movie_id', 'theater_id']);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('movies_theaters');
};
