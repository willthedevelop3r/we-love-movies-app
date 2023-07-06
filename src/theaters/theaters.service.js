const knex = require('../db/connection');

function list() {
  return knex('theaters')
    .select('*')
    .then((theaters) => {
      const promises = theaters.map((theater) =>
        knex('movies')
          .select('*')
          .join(
            'movies_theaters',
            'movies.movie_id',
            'movies_theaters.movie_id'
          )
          .where('movies_theaters.theater_id', theater.theater_id)
          .then((movies) => ({ ...theater, movies }))
      );

      return Promise.all(promises);
    });
}

module.exports = {
  list,
};
