if (process.env.USER) require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const notFound = require('./errors/notFound');
const moviesRouter = require('./movies/movies.router');

app.use(express.json());
app.use(cors());

app.use('/movies', moviesRouter);

app.use(notFound);
app.use((error, _request, response, _next) => {
  const { status = 500, message = 'Something went wrong!' } = error;
  response.status(status).json({ error: message });
});

module.exports = app;
