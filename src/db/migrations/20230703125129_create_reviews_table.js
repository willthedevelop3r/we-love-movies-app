// ------ CREATE 'REVIEWS' TABLE ------- //
exports.up = function (knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('review_id').primary();
    table.text('content');
    table.integer('score');
    table.integer('movie_id').unsigned().notNullable();
    table.foreign('movie_id').references('movies.movie_id').onDelete('CASCADE');
    table.integer('critic_id').unsigned().notNullable();
    table
      .foreign('critic_id')
      .references('critics.critic_id')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

// ------- DROPS 'REVIEWS' TABLE ------- //
exports.down = function (knex) {
  return knex.schema.dropTable('reviews');
};
