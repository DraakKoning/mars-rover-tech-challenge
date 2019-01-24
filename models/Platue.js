// Load in required libraries
const validator = require('validator');
const Rover = require('../models/Rover');

// This is the constructor definition for a Platue
function Platue(sizeX, sizeY) {
    // check if input is valid
    validate(sizeX, sizeY);

    // set object properties
    this.sizeX = parseInt(sizeX);
    this.sizeY = parseInt(sizeY);

    // arrays in Javascript has similar functionality to a queue
    this.rovers = [];

    // This array keeps positions of that have already been placed and moved
    this.roverPositions = [];

    this.roverErrors = [];
}

Platue.prototype.createRover = function (inputOjbect) {
    try {
        return new Rover(inputOjbect.x, inputOjbect.y, inputOjbect.cardinal_point, inputOjbect.movement_instruction);
    } catch (error) {        
        this.roverErrors.push(error);
        return false;
    }
};

// this function loops over an array of rovers and adds the valid rovers
Platue.prototype.addRovers = function(rovers) {
    // check if rovers is a an array
    
    if (!(rovers instanceof Array)) {
        throw new Error('roversNotAnArray');
    }

    // loop over array
    for (let i = 0; i < rovers.length; i++) {
        
        const element = rovers[i];
        // try and create a valid rover, otherwise continue
        let newRover = this.createRover(element);
        if (newRover) {
           // try and move rover
            this.moveRover(newRover);
        }
    }
};

Platue.prototype.canMove = function (rover) {
    let newX = rover.x;
    let newY = rover.y;
    switch (rover.cardinalPoint) {
        case 'N':
            newY = rover.y + 1;
            break;
        case 'E':
            newX = rover.x + 1;
            break;
        case 'S':
            newY = rover.y - 1;
            break;
        case 'W':
            newX = rover.x - 1;
            break;

        default:
            break;
    }
    // check wether rover is still in bounds
    if ((newX < 0) || (newY < 0) || (newX > this.sizeX) || (newY > this.sizeY)) {
        return false;
    }

    // now check if there could be any collisions
    let position = newX + ',' + newY;
    
    
    if (this.roverPositions.includes(position)) {
        return false;
    }

    return true;
};

// function to try and move rover
Platue.prototype.moveRover = function (rover) {
    // check if rover is in bounds of platue
    if (!this.roverBoundValid(rover)) {
        this.roverErrors.push(new Error('cannotPlaceRover'));
        return; 
    }

    // convert current rover position to 'x,y' and check if position exists
    let position = rover.positionToString();
    if (this.roverPositions.includes(position)) {
        this.roverErrors.push(new Error('cannotPlaceRover'));
        return;
    }

    // loop through rover commands. We ignore any commands that are not either L,R or M
    const movementInstructions = rover.movementInstruction;
    for (let i = 0; i < movementInstructions.length; i++) {
        const element = movementInstructions.charAt(i);
        if (element === 'L' || element === 'R' ) {
            rover.rotate(element);
        } else if (element === 'M') {
            // first check if there is another rover in the way
            if (this.canMove(rover)) {
                rover.move();
            } else {
                break;
            }
        }
    }

    // Now add the rover to the rovers array and its postion to the roverPositions array
    this.rovers.push(rover);
    this.roverPositions.push(rover.positionToString());
};

// This function checks if the rover is in the bounds of the platue
Platue.prototype.roverBoundValid = function (rover) {
    if ((rover.x < 0) || (rover.y < 0) || (rover.x > this.sizeX) || (rover.y > this.sizeY)) {
        return false;
    } else {
        return true;
    }
};

// this function returns the result of placing all the rovers on the platue
Platue.prototype.returnRoverPositions = function (rovers) {
    return this.rovers;
};

// this function returns any errors
Platue.prototype.returnErrors = function (rovers) {
    return this.roverErrors;
};

// check to make sure a valid size has been given
function validate(sizeX, sizeY) {
    if (!validator.isInt(sizeX + '', { min: 1 })) {
        throw new Error('sizeXNotValid');
    } else if (!validator.isInt(sizeY + '', { min: 1 })) {
        throw new Error('sizeYNotValid');
    }
}

module.exports = Platue;