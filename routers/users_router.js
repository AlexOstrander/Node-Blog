const express = require('express');
const router = express.Router();
const customMiddle = require('../customMiddle.js')
//Database
const dbUser = require('../data/helpers/userDb.js')
//Endpoints for users
router.get('/:id?', (req, res) => {
  const {
    id
  } = req.params
  dbUser.get(id)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res
        .status(500)
        .json({
          Message: "User not found :/."
        })
    })
});

router.post('/', customMiddle.upperName, (req, res) => {
  const user = req.body;
  if (user.name) {
    dbUser.insert(user)
      .then(user => {
        res
          .status(201)
          .json(user)
      })
      .catch(err => {
        res
          .status(500)
          .json({
            Message: "Failed to add user."
          })
      })
  } else {
    res
      .status(400)
      .json({
        Message: "Invalid request, please add a users name."
      })
  }
});

router.put('/:id', customMiddle.upperName, (req, res) => {
  const {
    id
  } = req.params;
  const user = req.body;
  if (user.name) {
    dbUser.update(id, user)
      .then(count => {
        if (count === 1) {
          dbUser.get(id).then(user => {
            res.json(user);
          })
        } else {
          res
            .status(404)
            .json({
              Message: "The user with that ID does not exist!"
            })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            Error: "The user information could not be modified."
          })
      })
  } else {
    res
      .status(400)
      .json({
        Message: "please provide the updated name"
      })
  }

});

router.delete('/:id', (req, res) => {
  const {
    id
  } = req.params;
  dbUser.remove(id)
    .then(user => {
      if (id == true) {
        res.json(user)
      } else {
        res
          .status(404)
          .json({
            Message: "The specified user does not exist!"
          })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({
          Message: "Failed to delete user"
        })
    })
});

module.exports = router;
