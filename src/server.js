const { PORT = 5001 } = process.env;
const app = require('./app');
const knex = require('./db/connection');
const listener = () => console.log(`Listening on Port ${PORT}!`);
// const cron = require('node-cron');
// const axios = require('axios');
const { BACK_URL } = process.env;

knex.migrate
  .latest()
  .then((migrations) => {
    console.log('migrations', migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);

// cron.schedule('*/14 * * * *', () => {
//   axios
//     .get(BACK_URL)
//     .then((response) => console.log(`Status: ${response.status}`))
//     .catch((error) => console.error(error));
// });
