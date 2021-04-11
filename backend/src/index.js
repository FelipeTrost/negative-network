/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const mongoose = require('mongoose');

const dburl = process.env.NODE_ENV === 'production' ? pocess.env.MONGO_URL : 'mongodb+srv://app:3gbgCBtsZLVcHYv@cluster0.kspsb.mongodb.net/negativeNetwork?retryWrites=true&w=majority';
console.log(dburl);
console.log(process.env.NODE_ENV);
mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  const server = app.listen(port);

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  );
})

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

