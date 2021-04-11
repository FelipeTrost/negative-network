/* eslint-disable no-console */
const mongoose = require('mongoose');
const logger = require('./logger');
const app = require('./app');
const port = process.env.PORT || 3030;
mongoose.connect('mongodb+srv://app:3gbgCBtsZLVcHYv@cluster0.kspsb.mongodb.net/negativeNetwork?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  const server = app.listen(port);

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  );
})

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

