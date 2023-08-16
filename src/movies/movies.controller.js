const service = require('../movies/movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Get all movies
async function list(req, res, next) {
  const data = await service.getAllMovies(req.query.is_showing);
  res.status(200).json({ data: data });
}

// Get particular movie
async function read(req, res, next) {
  const data = await service.getMovieById(req.params.movieId);
  if (!data) {
    return next({
      status: 404,
      message: 'Movie cannot be found.',
    });
  }
  res.status(200).json({ data: data });
}

// Get movie theater
async function getMovieTheaters(req, res) {
  const data = await service.getMovieTheaters(req.params.movieId);
  res.status(200).json({ data: data });
}

// Get movie reviews
async function getMovieReviews(req, res) {
  const data = await service.getMovieReviews(req.params.movieId);
  res.status(200).json({ data: data });
}

// Export functions
module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  getMovieTheaters: asyncErrorBoundary(getMovieTheaters),
  getMovieReviews: asyncErrorBoundary(getMovieReviews),
};
