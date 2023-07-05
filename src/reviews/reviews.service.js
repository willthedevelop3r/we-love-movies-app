const knex = require('../db/connection');
const mapProperties = require('../utils/map-properties');

async function read(reviewId) {
  return knex('reviews').select('*').where({ review_id: reviewId }).first();
}

async function update(updatedReview) {
  return knex('reviews')
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, '*')
    .then(() =>
      knex('reviews')
        .select('reviews.*', 'critics.*')
        .join('critics', 'reviews.critic_id', 'critics.critic_id')
        .where({ 'reviews.review_id': updatedReview.review_id })
    )
    .then((reviews) => {
      return reviews.map((review) => ({
        ...review,
        critic: {
          critic_id: review.critic_id,
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
          created_at: review.created_at,
          updated_at: review.updated_at,
        },
      }));
    })
    .then((data) => data[0]);
}

async function destroy(reviewId) {
  return knex('reviews').where({ review_id: reviewId }).del();
}

module.exports = {
  read,
  update,
  destroy: destroy,
};
