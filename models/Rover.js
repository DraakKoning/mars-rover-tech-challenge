// Load in required libraries
const validator = require('validator');

// This is the constructor definition for a rover
function Rover(x, y, cardinalPoint, movementInstruction ) {   
    // check if input is valid
    validate(x, y, cardinalPoint);

    // set object properties
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.cardinalPoint = cardinalPoint;
    this.movementInstruction = movementInstruction;
}

Rover.prototype.rotate = function (direction) {
    // using an array, we can get the direction by subtracting or adding 1 depending on direction
    const cardinalArray = ['N', 'E', 'S', 'W'];
    let positionInArray = cardinalArray.indexOf(this.cardinalPoint);
    if (direction === 'L') {
        positionInArray -= 1;
    } else if (direction === 'R') {
        positionInArray += 1;
    }

    // now fix the index value if going from N to W or W to N
    if (positionInArray < 0) {
        positionInArray = 3;
    } else if (positionInArray >3) {
        positionInArray = 0;
    }

    // set the new direction
    this.cardinalPoint = cardinalArray[positionInArray];
};

// convert postion to a string containing x,y
Rover.prototype.positionToString = function () {
    return this.x + ',' + this.y;
};

// moves the rover in the direction it is facing
Rover.prototype.move = function () {
    let newX = this.x;
    let newY = this.y;
    switch (this.cardinalPoint) {
        case 'N':
            newY = this.y + 1;
            break;
        case 'E':
            newX = this.x + 1;
            break;
        case 'S':
            newY = this.y - 1;
            break;
        case 'W':
            newX = this.x - 1;
            break;

        default:
            break;
    }
    // check wether rover x and y is still valid
    if ((newX < 0) || (newY < 0) ) {
        return;
    }

    this.x = newX;
    this.y = newY;
    return;
};

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