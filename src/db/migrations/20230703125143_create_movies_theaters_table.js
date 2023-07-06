// ------- CREATES 'MOVIES_THEATERS' TABLE ------- //
exports.up = function (knex) {
  return knex.schema.createTable('movies_theaters', (table) => {
    table.increments('id').primary();
    table.integer('movie_id').unsigned().notNullable();
    table.foreign('movie_id').references('movies.movie_id').onDelete('CASCADE');
    table.integer('theater_id').unsigned().notNullable();
    table
      .foreign('theater_id')
      .references('theaters.theater_id')
      .onDelete('CASCADE');
    table.boolean('is_showing').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

// ------- DROPS 'MOVIES_THEATERS' TABLE ------ //
exports.down = function (knex) {
  return knex.schema.dropTable('movies_theaters');
};
