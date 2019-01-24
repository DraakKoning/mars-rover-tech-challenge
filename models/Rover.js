// Load in required libraries
const validator = require('validator');

// This is the constructor definition for a rover
function Rover(x, y, cardinalPoint) {   
    // check if input is valid
    validate(x, y, cardinalPoint);

    // set object properties
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.cardinalPoint = cardinalPoint;
}

// Here we check that x and y are positive integers and that the cardinalPoint is either N,S,E,W
function validate(x, y, cardinalPoint) {
    if (!validator.isInt(x + '', { min: 0 })) {
        throw new Error('coordinateXNotValid');
    } else if (!validator.isInt(y + '', { min: 0 })) {
        throw new Error('coordinateYNotValid');
    } if (!validator.isIn(cardinalPoint, ['N', 'S', 'E', 'W'])) {
        throw new Error('cardinalPointNotValid');
    }
}

module.exports = Rover;