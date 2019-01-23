//Express framework
const express = require('express');
//Database
const dbUser = require('./data/helpers/userDb.js')
//Helmet security
const helmet = require('helmet');
// Logging request with Morgan
const logger = require('morgan');
 
const cors = require('cors');

const server = express();
const PORT = 4000;
const parser = express.json();
const customMiddle = require('./customMiddle.js')
//Middleware
server.use(
    parser,
    logger('tiny'),
    helmet(),
    cors(),
    customMiddle.upperName
);

//Endpoints for users
server.get('/api/users/:id?', (req, res) => {
    const { id } = req.params
    dbUser.get(id)
        .then(user => {
        res.json(user)
    })
        .catch(err => {
        res
            .status(500)
            .json({ Message: "User not found :/."})
    })
});

server.post('/api/users/', customMiddle.upperName, (req, res) => {
   const user  = req.body;
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
                .json({ Message: "Failed to add user."})
        })
    } else {
        res
            .status(400)
            .json({Message: "Invalid request, please add a users name."})
    }
});

server.put('/api/users/:id', customMiddle.upperName, (req, res) => {
    const { id } = req.params;
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
                    .json({Message: "The user with that ID does not exist!"})
            }
        })
            .catch(err => {
            res
                .status(500)
                .json({Error: "The user information could not be modified." })
        })
    } else {
        res
            .status(400)
            .json({Message: "please provide the updated name"})
    }
    
});

server.delete('/api/users/:id', (req, res) => {
   const { id } = req.params;
    dbUser.remove(id)
        .then(user => {
        if (id == true) {
          res.json(user)          
        } else {
            res
            .status(404)
            .json({Message: "The specified user does not exist!"})
        }
    })
        .catch(err => {
        res
            .status(500)
            .json({Message: "Failed to delete user"})
    })
});


//Listening express server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});