const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.end("Not available"));

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

mongoose.connect('mongodb+srv://app:3gbgCBtsZLVcHYv@cluster0.kspsb.mongodb.net/negativeNetwork?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to database"))
.catch(err => {
  if(err) throw err;
});

module.exports = app;
