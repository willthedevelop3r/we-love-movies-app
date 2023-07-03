const knex = require('../db/connection');

function getAllMovies(is_showing) {
  return knex('movies')
    .select('movies.*')
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            'movies_theaters',
            'movies.movie_id',
            'movies_theaters.movie_id'
          )
          .where({ 'movies_theaters.is_showing': true })
          .groupBy('movies.movie_id');
      }
    });
}

module.exports = {
  getAllMovies,
};
