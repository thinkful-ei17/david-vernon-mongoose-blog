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

      let sample = posts.map((post) => {
        return post.serialize();
      })

      let output = JSON.stringify(sample,null,4);
      console.log(output);

      res.json({
        posts: posts.map(
          (post) => post.serialize())
      });
    });
});

router.get('/posts/:id', (req, res) => {
  Post
    .find()
    .then(posts => {

      let sample = posts.map((post) => {
        return post.serialize();
      })

      let output = JSON.stringify(sample,null,4);
      console.log(output);

      res.json({
        posts: posts.map(
          (post) => post.serialize())
      });
    });
});

router.post('/posts', (req, res) => {
  Post
    .find()
    .then(posts => {

      let sample = posts.map((post) => {
        return post.serialize();
      })

      let output = JSON.stringify(sample,null,4);
      console.log(output);

      res.json({
        posts: posts.map(
          (post) => post.serialize())
      });
    });
});

router.put('/posts/:id', (req, res) => {
  Post
    .find()
    .then(posts => {

      let sample = posts.map((post) => {
        return post.serialize();
      })

      let output = JSON.stringify(sample,null,4);
      console.log(output);

      res.json({
        posts: posts.map(
          (post) => post.serialize())
      });
    });
});

router.delete('/posts/:id', (req, res) => {
  Post
    .find()
    .then(posts => {

      let sample = posts.map((post) => {
        return post.serialize();
      })

      let output = JSON.stringify(sample,null,4);
      console.log(output);

      res.status(204).end();
    });
});

module.exports = router;
