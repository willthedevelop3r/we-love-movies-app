# We Love Movies

## About

This is a backend project built with Node.js, PostgreSQL, Express, and Knex. The project is connected to a PostgreSQL database and retrieves data using the Knex query builder.

The project structure includes the following files and directories:

- app.js: The main application file where the Express app is created and configured.
- server.js: The entry point file where the server is started and listens for incoming requests.
- movies/: Directory containing files related to movies functionality, including movies.service.js, movies.router.js, and movies.controller.js.
- reviews/: Directory containing files related to reviews functionality.
- theaters/: Directory containing files related to theaters functionality.
- db/: Directory containing database-related files, including migrations and seeds.

The db directory contains the following:

- migrations/: Directory containing migration files that define the structure of the 5 database tables.
- seeds/: Directory containing seed files that populate the database with initial data.

The migration files in the migrations directory define the tables and their columns, while the seed files in the seeds directory provide initial data for the tables.

The backend project leverages the Express framework to handle HTTP requests and responses, and the Knex library for building SQL queries and interacting with the PostgreSQL database.

Overall, this project provides backend functionality for managing movies, reviews, and theaters, with support for error handling, data validation, and a typical server setup using app.js and server.js. The db directory includes migration and seed files to manage the database structure and initial data.
