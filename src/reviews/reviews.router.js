const express = require('express');
const router = express.Router();
const controller = require('./reviews.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/:reviewId')
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
