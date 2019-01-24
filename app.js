// load libraries and file dependancies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const httpLogger = require('morgan');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');


// Imports for the app routes (controllers) for the app

// create the express app
const app = express();

// Here are some basic security settings
app.use(helmet.hidePoweredBy());
app.use(cors());

// add a logger that will display http calls to the server for development
if (process.env.NODE_ENV === 'development') {
    app.use(httpLogger('dev'));
}

// Only allow json requests to our server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // NOTE: Limit request Body length (BodyParser limits to 100kb by default)

// a middleware validator that we can use to validate the request data
app.use(expressValidator());

// Add headers to server responses
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

// Check for invalid JSON body
app.use(function (err, req, res, next) {
    if (err) {
        return res.status(400).json({
            code: '400',
            errorType: 'invalidJSON'
        });
    }

    next();
});

// A health_check route to make sure the server is still responsive
app.use('/health_check', function (req, res, next) {
    return res.status(200).json({
        code: 200,
        successType: 'Healthy'
    });
});

// Load the app routes that were imported
// app.use('/users', users)

// catch routes that do not exist
app.use(function (req, res, next) {
    res.status(404).send();
});

// export the app to be used by the server file and test server file
module.exports = app;