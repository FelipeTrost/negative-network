const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const mongoose = require('mongoose');
const service = require('feathers-mongoose').Service;
const isImageUrl = require('is-image-url');
const lang = require('iso-639-1');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const { disallow } = require('feathers-hooks-common');

const appHooks = require('./app.hooks');
const channels = require('./channels');
const Comment = require('./models/Comment')

mongoose.connect('mongodb+srv://app:3gbgCBtsZLVcHYv@cluster0.kspsb.mongodb.net/negativeNetwork?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to database"))
.catch(err => {
  if(err) throw err;
});

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());


class commentService extends service {

  async patch(id, {dislike}) {
    // console.log("askdjfalskdfjlkasdjflökas");
    try {
      const comment = await Comment.findById(id);

      if (dislike)
        comment.dislikes++;
      else if(comment.dislikes > 0)
        comment.dislikes--;

      await comment.save();

      return comment;
    } catch (error) {
      console.error(error);
    }
  }

}

app.use('/comment', new commentService({
  Model: Comment,
  lean: true, // set to false if you want Mongoose documents returned
  // paginate: {
  //   default: 40,
  //   max: 50
  // }
}));

app.service('comment').hooks({
  before:{
    // patch: disallow(),
    remove: disallow(),
    update: disallow(),
    create: [ async context => {
      context.data['createdAt'] = new Date();

      const url = context.data['picture'];
      context.data['picture'] = url && isImageUrl(url) ? url : "";

      const glang = context.data['lang'];
      context.data['lang'] = lang.validate(glang) ? glang : "";

      return context;
    }  ]
  }
})

// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
