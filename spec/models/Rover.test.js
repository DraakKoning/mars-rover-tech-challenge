const expect = require('expect');
const Rover = require('../../models/Rover');

const defaultX = 2;
const defaultY = 3;
const defaultCardinal = 'N';

describe('Rover model', () => {
    describe('validation', () => {
        it('will create a valid rover', () => {
            try {
                let rover = new Rover(2, 3, 'N');
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
});

// Here are some helper functions for the tests
const expectValueToBeStored = function (property, value) {
    try {
        let rover = new Rover(defaultX, defaultY, defaultCardinal);
        expect(rover[property]).toEqual(value);
    } catch (error) {
        expect(error).toBeUndefined();
    }
};

const expectToThrowCoordinateXNotValid = function (invalidX) {
    expect(() => {
        let rover = new Rover(invalidX, defaultY, defaultCardinal);
    }).toThrow('coordinateXNotValid');
};

const expectToThrowCoordinateYNotValid = function (invalidY) {
    expect(() => {
        let rover = new Rover(defaultX, invalidY, defaultCardinal);
    }).toThrow('coordinateYNotValid');
};

const expectToThrowCardinalPointNotValid = function (invalidCardinalPoint) {
    expect(() => {
        let rover = new Rover(defaultX, defaultY, invalidCardinalPoint);
    }).toThrow('cardinalPointNotValid');
};