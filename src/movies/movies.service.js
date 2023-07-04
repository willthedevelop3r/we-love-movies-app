const knex = require('../db/connection');

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

function getMovieById(movieId) {
  return knex('movies').select('*').where({ movie_id: movieId }).first();
}

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

function getMovieReviews(movieId) {
  return knex('reviews')
    .select('reviews.*', 'critics.*')
    .join('critics', 'reviews.critic_id', 'critics.critic_id')
    .where('reviews.movie_id', movieId)
    .then((reviews) => {
      // Format the reviews response to include critic details
      return reviews.map((review) => ({
        review_id: review.review_id,
        content: review.content,
        score: review.score,
        created_at: review.created_at,
        updated_at: review.updated_at,
        critic_id: review.critic_id,
        movie_id: review.movie_id,
        critic: {
          critic_id: review.critic_id,
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
          created_at: review.created_at,
          updated_at: review.updated_at,
        },
      }));
    });
}

module.exports = {
  getAllMovies,
  getMovieById,
  getMovieTheaters,
  getMovieReviews,
};
