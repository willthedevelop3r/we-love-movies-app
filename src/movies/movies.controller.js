const service = require('../movies/movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res, next) {
  const data = await service.getAllMovies(req.query.is_showing);
  res.json({ data: data });
}

async function read(req, res, next) {
  const { movieId } = req.params;
  const data = await service.getMovieById(movieId);
  if (!data) {
    return next({
      status: 404,
      message: 'Movie cannot be found.',
    });
  }
  res.json({ data: data });
}

async function getMovieTheaters(req, res, next) {
  const { movieId } = req.params;
  const data = await service.getMovieTheaters(movieId);
  res.json({ data: data });
}

async function getMovieReviews(req, res, next) {
  const { movieId } = req.params;
  const data = await service.getMovieReviews(movieId);
  res.json({ data: data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  getMovieTheaters: asyncErrorBoundary(getMovieTheaters),
  getMovieReviews: asyncErrorBoundary(getMovieReviews),
};
