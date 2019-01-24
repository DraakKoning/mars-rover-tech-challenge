// Load in required libraries
const validator = require('validator');

// This is the constructor definition for a Platue
function Platue(sizeX, sizeY) {
    // check if input is valid
    validate(sizeX, sizeY);

    // set object properties
    this.sizeX = parseInt(sizeX);
    this.sizeY = parseInt(sizeY);

    // array in Javascript has similar functionality to a queue
    this.rovers = [];
}

// check to make sure a valid size has been given
function validate(sizeX, sizeY) {
    if (!validator.isInt(sizeX + '', { min: 1 })) {
        throw new Error('sizeXNotValid');
    } else if (!validator.isInt(sizeY + '', { min: 1 })) {
        throw new Error('sizeYNotValid');
    }
}

module.exports = Platue;