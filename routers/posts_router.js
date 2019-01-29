const express = require('express');
const router = express.Router();
const dbPost = require('../data/helpers/postDb.js')

router.get('/:id?', (req, res) => {
  const {
    id
  } = req.params;
  dbPost
    .get(id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({
        Message: "Oh snap! Something messed up!"
      })
    })
});

router.post('/', (req, res) => {
  const post = req.body;
  if (post.userId && post.text) {
    dbPost
      .insert(post)
      .then(post => {
        res
          .status(201)
          .json(post)
      })
      .catch(err => {
        res
          .status(500)
          .json({
            Message: "An error has occured trying to post"
          })
      });
  } else {
    res
      .status(400)
      .json({
        Message: "Please add userId and text"
      })
  }
});


router.put('/:id', (req, res) => {
  const {
    id
  } = req.params;
  const post = req.body;
  if (post.userId && post.text) {
    dbPost
      .update(id, post)
      .then(count => {
        if (count === 1) {
          dbPost
            .get(id)
            .then(post => {
              res
                .status(201)
                .json(post)
            })
        } else {
          res.json({
            Message: "The specified ID does not exist"
          })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            Message: "Something went wrong D:!"
          })
      })
  } else {
    res
      .status(401)
      .json({
        Message: "Please add a userId and text field"
      })
  }
});

router.delete('/:id', (req, res) => {
  const {
    id
  } = req.params;
  dbPost
    .remove(id)
    .then(post => {
      if (id == true) {
        res
          .json(post)
      } else {
        res
          .status(404)
          .json({
            Message: "The specified ID does not exist"
          })
      }
    }).catch(err => {
      res
        .status(500)
        .json({
          Message: "Failed to remove post"
        })
    })
});

module.exports = router;
