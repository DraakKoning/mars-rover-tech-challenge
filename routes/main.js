// import required files
const express = require('express');
const router = express.Router();
const Platue = require('../models/Platue');

// A middleware function to check that the input is valid
const validateInput = function (req, res, next) {
    // validate the platue info
    req.checkBody('platue.size_x', 'invalidInt').isInt({ min: 1 });
    req.checkBody('platue.size_y', 'invalidInt').isInt({ min: 1 });
    req.checkBody('platue.rovers', 'empty').notEmpty();
    
    req.getValidationResult()
        .then((result) => {
            if (!result.isEmpty()) {
                return res.status(400).json({
                    code: 400,
                    errorType: 'invalidRequest',
                    result: result.array()
                });
            }

            return next();
        })
        .catch((e) => {

            // This is to catch any unsuspected errors
            return res.status(500).json({
                code: 500,
                error: e
            });
        });
};

// add the exploreMars route to the express router.
router.post('/explore_mars', validateInput, function (req, res) {
    // create a platue
    const sizeX = req.body.platue.size_x;
    const sizeY = req.body.platue.size_y;
    const rovers = req.body.platue.rovers;

    const platue = new Platue(sizeX, sizeY);

    // add rovers to platue
    platue.addRovers(rovers);
    // return result
    res.status(200).json({
        code: 200,
        result: platue.returnRoverPositions(),
        errors: platue.returnErrors()
    });
});

// export the router
module.exports = router;