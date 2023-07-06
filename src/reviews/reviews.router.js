const express = require('express');
const router = express.Router();
const controller = require('./reviews.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

// ------ ROUTE FOR REVIEWS ------- //
router
  .route('/:reviewId')
  .put(controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
