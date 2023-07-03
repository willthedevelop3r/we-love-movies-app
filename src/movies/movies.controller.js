const service = require('../movies/movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res, next) {
  const movies = await service.getAllMovies(req.query.is_showing);
  res.json({ data: movies });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
