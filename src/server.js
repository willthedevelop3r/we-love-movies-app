const { PORT = 5001 } = process.env;

const app = require('./app');
const knex = require('./db/connection');

const listener = () => console.log(`Listening on Port ${PORT}!`);

knex.migrate
  .latest()
  .then((migrations) => {
    console.log('migrations', migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);

cron.schedule('*/14 * * * *', () => {
  axios
    .get('https://we-love-movies-backend-ratt.onrender.com')
    .then((response) => console.log(`Status: ${response.status}`))
    .catch((error) => console.error(error));
});
