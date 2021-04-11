/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const mongoose = require('mongoose');

const dburl = process.env.MONGO_URL;
console.log(dburl);
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  const server = app.listen(port);

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  );
})
.catch(err => console.log(dburl, err))

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

