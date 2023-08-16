const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Validate if review exists
async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);

  if (!review) {
    return next({
      status: 404,
      message: 'Review cannot be found.',
    });
  }

  res.locals.review = review; // Set res.locals.review
  next();
}

// Updates review
async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  const data = await service.update(updatedReview);

  res.status(200).json({ data: data });
}

// Deletes review
async function destroy(req, res) {
  await service.destroy(req.params.reviewId);
  res.status(204).end();
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
