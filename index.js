//Express framework
const express = require('express');
//Helmet security
const helmet = require('helmet');
// Logging request with Morgan
const logger = require('morgan');
 
const cors = require('cors');


const server = express();
const PORT = 4000;
const parser = express.json();

//Middleware
server.use(
    parser,
    logger('tiny'),
    helmet(),
    cors()
);








//Listening express server
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});