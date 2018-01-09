'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Post } = require('./models');

function seperateName (fullName) {
    return fullName.split(' ');
}

function printPretty(items){
  let sample = items.map((item) => {
    return item.serialize();
  })

  let output = JSON.stringify(sample,null,4);
  console.log(output);
}

router.get('/posts', (req, res) => {
  Post
    .find()
    .then(posts => {

      printPretty(posts);

      res.json({
        posts: posts.map(
          (post) => post.serialize())
      });
    });
});

router.get('/posts/:id', (req, res) => {
  let id = req.params.id;

  Post
    .findById(id)
    .then(post => {

      res.json(post.serialize());

    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.post('/posts', (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Post
    .create({
      author: {
        firstName: req.body.author.firstName,
        lastName: req.body.author.lastName,
      },
      content: req.body.content,
      title: req.body.title
    })
    .then(post => res.status(201).json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });


});

router.put('/posts/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({ message: message });
  }

  // we only support a subset of fields being updateable.
  // if the user sent over any of the updatableFields, we udpate those values
  // in document
  const toUpdate = {};
  const updateableFields = ['title', 'content', 'author.firstName', 'author.lastName'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Post
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(post=> res.status(200).json(post))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.delete('/posts/:id', (req, res) => {
  Post
    .findByIdAndRemove(req.params.id)
    .then(post => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = router;
