'use strict';

const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Post } = require('./models');

router.get('/posts', (req, res) => {
  Post
    .find()
    .then(posts => {
      res.json({
        posts: posts.map(
          (post) => post.serialize())
      });
    });
});







module.exports = router;