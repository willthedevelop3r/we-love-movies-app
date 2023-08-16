const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');
const moviesRouter = require('./movies/movies.router');
const reviewsRouter = require('./reviews/reviews.router');
const theatersRouter = require('./theaters/theaters.router');

if (process.env.USER) require('dotenv').config();

// Middleware for json parsing and cors handling
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

// Routes
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
