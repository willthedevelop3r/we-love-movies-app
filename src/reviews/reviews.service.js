const knex = require('../db/connection');

// ------- RETRIEVES PARTICULAR REVIEW ------ //
async function read(reviewId) {
  return knex('reviews').select('*').where({ review_id: reviewId }).first();
}

// ------ RETRIEVES UPDATED REVIEWS JOINED BY CRITICS TABLE ------- //
async function update(updatedReview) {
  return (
    knex('reviews')
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, '*')

      // ------- JOIN CRITICS TABLE ------- //
      .then(() =>
        knex('reviews')
          .select('reviews.*', 'critics.*')
          .join('critics', 'reviews.critic_id', 'critics.critic_id')
          .where({ 'reviews.review_id': updatedReview.review_id })
      )
      // ------- THEN MAP THROUGH JOINED TABLE FOR DESIRED RESULTS ------- //
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
      // ------- RETURN DATA AT INDEX ZERO TO PULL OUT OF ARRAY ------- //
      .then((data) => data[0])
  );
}

// ------- DELETES REVIEW ------- //
async function destroy(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  update,
  destroy: destroy,
};
