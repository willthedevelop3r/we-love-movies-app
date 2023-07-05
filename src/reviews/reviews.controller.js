const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);

  if (!review) {
    return next({
      status: 404,
      message: 'Review cannot be found.',
    });
  }

  res.locals.review = review;
  next();
}

async function update(req, res) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  const data = await service.update(updatedReview);

  res.status(200).json({ data });
}

async function destroy(req, res) {
  await service.destroy(req.params.reviewId);
  res.status(204).end();
}
module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
