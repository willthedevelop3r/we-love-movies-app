const knex = require('../db/connection');

// Retrieves theater joined by movies and movies_theaters
function list() {
  return (
    knex('theaters')
      .select('*')

      // Map through theaters, joining movies and movies_theaters
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

        // Return resolved promises
        return Promise.all(promises);
      })
  );
}

module.exports = {
  list,
};
