const service = require('../theaters/theaters.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// ------- GETS ALL THEATERS ------- //
async function list(req, res) {
  const data = await service.list();
  res.status(200).json({ data: data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
