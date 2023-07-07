const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');
const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');
const theatersRouter = require('./theaters/theaters.router');

if (process.env.USER) require('dotenv').config();

// ------- MIDDLEWARE FOR JSON PARSING AND CORS HANDLING ------- //
app.use(express.json());
app.use(cors());

// ------- ROUTES -------- //
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);

// ------- ERROR HANDLERS ------- //
app.use(notFound);
app.use(errorHandler);

module.exports = app;
