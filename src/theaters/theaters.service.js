const knex = require('../db/connection');

// ------- RETRIEVES THEATERS JOINED BY MOVIES AND MOVIES_THEATERS ------- //
function list() {
  return (
    knex('theaters')
      .select('*')

      // ------- MAP THROUGH THEATERS, JOINING MOVIES AND MOVIES_THEATERS ------- //
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

        // ------- RETURN RESOLVED PROMISES ------- //
        return Promise.all(promises);
      })
  );
}

module.exports = {
  list,
};
