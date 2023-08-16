const knex = require('../db/connection');

// Retrieves movies joined by movies_theaters
function getAllMovies(is_showing) {
  const query = knex('movies').select('movies.*');

  if (is_showing) {
    query
      .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
      .where('movies_theaters.is_showing', true)
      .groupBy('movies.movie_id');
  }

  return query;
}

// Retrieves particular movie
function getMovieById(movieId) {
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}

// Retrieves theater joined by movies_theater
function getMovieTheaters(movieId) {
  return knex('theaters')
    .select('theaters.*')
    .join(
      'movies_theaters',
      'theaters.theater_id',
      'movies_theaters.theater_id'
    )
    .where({ 'movies_theaters.movie_id': movieId });
}

// Reviews joined by critics table
function getMovieReviews(movieId) {
  return (
    knex('reviews')
      .select('reviews.*', 'critics.*')
      .join('critics', 'reviews.critic_id', 'critics.critic_id')
      .where('reviews.movie_id', movieId)

      // Map through joined tables for desired results
      .then((reviews) =>
        reviews.map((review) => ({
          ...review,
          critic: {
            critic_id: review.critic_id,
            preferred_name: review.preferred_name,
            surname: review.surname,
            organization_name: review.organization_name,
            created_at: review.created_at,
            updated_at: review.updated_at,
          },
        }))
      )
      .catch((error) => {
        console.error('Error retrieving movie reviews:', error);
        throw error;
      })
  );
}

module.exports = {
  getAllMovies,
  getMovieById,
  getMovieTheaters,
  getMovieReviews,
};
