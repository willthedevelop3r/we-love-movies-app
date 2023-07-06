const service = require('../movies/movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// ------- GETS ALL MOVIES ------- //
async function list(req, res, next) {
  const data = await service.getAllMovies(req.query.is_showing);
  res.status(200).json({ data: data });
}

// ------- GETS PARTICULAR MOVIE ------- //
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

// ------ GETS MOVIE THEATERS ------ //
async function getMovieTheaters(req, res) {
  const data = await service.getMovieTheaters(req.params.movieId);
  res.status(200).json({ data: data });
}

// ------- GETS MOVIE REVIEWS ------- //
async function getMovieReviews(req, res) {
  const data = await service.getMovieReviews(req.params.movieId);
  res.status(200).json({ data: data });
}

// ------ EXPORT FUNCTIONS ------- //
module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  getMovieTheaters: asyncErrorBoundary(getMovieTheaters),
  getMovieReviews: asyncErrorBoundary(getMovieReviews),
};
