const expect = require('expect');
const Rover = require('../../models/Rover');

const defaultX = 2;
const defaultY = 3;
const defaultCardinal = 'N';
const defaultMovementInstruction = 'LMRRRM';

describe('Rover model', () => {
    // here we are going to test our validation rules
    describe('validation', () => {
        it('will create a valid rover', () => {
            try {
                let rover = new Rover(defaultX, defaultY, defaultCardinal, defaultMovementInstruction);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('will store the value for x', () => {
            expectValueToBeStored('x', defaultX);
        });

        it('will store the value for y', () => {
            expectValueToBeStored('y', defaultY);
        });

        it('will store the value for the cardinalPoint', () => {
            expectValueToBeStored('cardinalPoint', defaultCardinal);
        });

        describe('x', () => {
            describe('is not an int', () => {
                it('will throw error with message coordinateXNotValid', () => {
                    expectToThrowCoordinateXNotValid('notAnInt');
                });
            });

            describe('is less than 0', () => {
                it('will throw error with message coordinateXNotValid', () => {
                    expectToThrowCoordinateXNotValid(-1);
                });
            });
        });

        describe('y', () => {
            describe('is not an int', () => {
                it('will throw error with message coordinateXNotValid', () => {
                    expectToThrowCoordinateYNotValid('notAnInt');
                });
            });

            describe('is less than 0', () => {
                it('will throw error with message coordinateXNotValid', () => {
                    expectToThrowCoordinateYNotValid(-1);
                });
            });
        });


        describe('cardinalPoint', () => {
            describe('is not in [\'N\', \'S\', \'E\', \'W\']', () => {
                it('will throw error with message coordinateXNotValid', () => {
                    expectToThrowCardinalPointNotValid('A');
                });
            });
        });
    });

    // here we are going to test the rotate function
    describe('.rotate', () => {
        describe('input value is L', () => {
            describe('current cardinalPoint is N', () => {
                it('Will rotate the rover to face W', () => {
                    roverMovesToExpectedDirection('N', 'L', 'W');
                });
            });

            describe('current cardinalPoint is W', () => {
                it('Will rotate the rover to face S', () => {
                    roverMovesToExpectedDirection('W', 'L', 'S');
                });
            });

            describe('current cardinalPoint is S', () => {
                it('Will rotate the rover to face E', () => {
                    roverMovesToExpectedDirection('S', 'L', 'E');
                });
            });

            describe('current cardinalPoint is E', () => {
                it('Will rotate the rover to face N', () => {
                    roverMovesToExpectedDirection('E', 'L', 'N');
                });
            });
        });

        describe('input value is R', () => {
            describe('current cardinalPoint is N', () => {
                it('Will rotate the rover to face E', () => {
                    roverMovesToExpectedDirection('N', 'R', 'E');
                });
            });

            describe('current cardinalPoint is W', () => {
                it('Will rotate the rover to face N', () => {
                    roverMovesToExpectedDirection('W', 'R', 'N');
                });
            });

            describe('current cardinalPoint is S', () => {
                it('Will rotate the rover to face W', () => {
                    roverMovesToExpectedDirection('S', 'R', 'W');
                });
            });

            describe('current cardinalPoint is E', () => {
                it('Will rotate the rover to face S', () => {
                    roverMovesToExpectedDirection('E', 'R', 'S');
                });
            });
        });
    });

    // here we are going to test the function that transforms the cordinates into a string
    describe('.positionToString', () => {
        it('will return a string representation of the current coordinates', () => {
            let rover = new Rover(defaultX, defaultY, defaultCardinal, defaultMovementInstruction);
            expect(rover.positionToString()).toEqual('2,3');
        });
    });

    // here we are going to test the function that tries to move the rover
    describe('.move', () => {
        describe('rover is facing N', () => {
            it(' will increase y\'s value by 1', () => {
                let rover = new Rover(defaultX, defaultY, 'N', defaultMovementInstruction);
                rover.move();
                expect(rover.y).toEqual(defaultY + 1);
            });
        });

        describe('rover is facing E', () => {
            it(' will increase x\'s value by 1', () => {
                let rover = new Rover(defaultX, defaultY, 'E', defaultMovementInstruction);
                rover.move();
                expect(rover.x).toEqual(defaultX + 1);
            });
        });


        describe('rover is facing S', () => {
            describe('rover\'s y value is more than zero', () => {
                it(' will decrease y\'s value by 1', () => {
                    let rover = new Rover(defaultX, defaultY, 'S', defaultMovementInstruction);
                    rover.move();
                    expect(rover.y).toEqual(defaultY - 1);
                });
            });

            describe('rover\'s y value is zero', () => {
                it(' will not change the y value', () => {
                    let rover = new Rover(defaultX, 0, 'S', defaultMovementInstruction);
                    rover.move();
                    expect(rover.y).toEqual(0);
                });
            });
        });

        describe('rover is facing W', () => {
            describe('rover\'s y value is more than zero', () => {
                it(' will decrease y\'s value by 1', () => {
                    let rover = new Rover(defaultX, defaultY, 'W', defaultMovementInstruction);
                    rover.move();
                    expect(rover.x).toEqual(defaultX - 1);
                });
            });

            describe('rover\'s x value is zero', () => {
                it(' will not change the y value', () => {
                    let rover = new Rover(0, defaultY, 'W', defaultMovementInstruction);
                    rover.move();
                    expect(rover.x).toEqual(0);
                });
            });
        });
    });
});

// Here are some helper functions for the tests
const expectValueToBeStored = function (property, value) {
    try {
        let rover = new Rover(defaultX, defaultY, defaultCardinal, defaultMovementInstruction);
        expect(rover[property]).toEqual(value);
    } catch (error) {
        expect(error).toBeUndefined();
    }
};

const expectToThrowCoordinateXNotValid = function (invalidX) {
    expect(() => {
        let rover = new Rover(invalidX, defaultY, defaultCardinal, defaultMovementInstruction);
    }).toThrow('coordinateXNotValid');
};

const expectToThrowCoordinateYNotValid = function (invalidY) {
    expect(() => {
        let rover = new Rover(defaultX, invalidY, defaultCardinal, defaultMovementInstruction);
    }).toThrow('coordinateYNotValid');
};

const expectToThrowCardinalPointNotValid = function (invalidCardinalPoint) {
    expect(() => {
        let rover = new Rover(defaultX, defaultY, invalidCardinalPoint, defaultMovementInstruction);
    }).toThrow('cardinalPointNotValid');
};

const roverMovesToExpectedDirection = function (currentCardinal, direction, expectedCardinal) {
    let rover = new Rover(defaultX, defaultY, currentCardinal, defaultMovementInstruction);
    rover.rotate(direction);
    expect(rover.cardinalPoint).toEqual(expectedCardinal);
};
