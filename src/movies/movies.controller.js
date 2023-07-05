const service = require('../movies/movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res, next) {
  const data = await service.getAllMovies(req.query.is_showing);
  res.json({ data: data });
}

async function read(req, res, next) {
  const data = await service.getMovieById(req.params.movieId);
  if (!data) {
    return next({
      status: 404,
      message: 'Movie cannot be found.',
    });
  }
  res.json({ data: data });
}

async function getMovieTheaters(req, res) {
  const data = await service.getMovieTheaters(req.params.movieId);
  res.json({ data: data });
}

async function getMovieReviews(req, res) {
  const data = await service.getMovieReviews(req.params.movieId);
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  getMovieTheaters: asyncErrorBoundary(getMovieTheaters),
  getMovieReviews: asyncErrorBoundary(getMovieReviews),
};
