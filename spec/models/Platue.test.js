const expect = require('expect');
const Platue = require('../../models/Platue');
const Rover = require('../../models/Rover');

// for the Platue
const defaultSizeX = 2;
const defaultSizeY = 3;

// for the rovers
const defaultX = 2;
const defaultY = 3;
const defaultCardinal = 'N';
const defaultMovementInstruction = 'LMRRRM';

describe('Platue model', () => {

    // Here we are testing all the validation rules that were set up for the platue model
    describe('validation', () => {
        it('will create a valid Platue', () => {
            try {
                let platue = new Platue(defaultSizeX, defaultSizeY);
            } catch (error) {
                expect(error).toBeUndefined();
            }
        });

        it('will store the value for sizeX', () => {
            expectValueToBeStored('sizeX', defaultSizeX);
        });

        it('will store the value for sizeY', () => {
            expectValueToBeStored('sizeY', defaultSizeY);
        });

        describe('sizeX', () => {
            describe('is not an int', () => {
                it('will throw error with message sizeXNotValid', () => {
                    expectToThrowSizeXNotValid('notAnInt');
                });
            });

            describe('is less than 0', () => {
                it('will throw error with message sizeXNotValid', () => {
                    expectToThrowSizeXNotValid(-1);
                });
            });
        });

        describe('sizeY', () => {
            describe('is not an int', () => {
                it('will throw error with message sizeYNotValid', () => {
                    expectToThrowSizeYNotValid('notAnInt');
                });
            });

            describe('is less than 0', () => {
                it('will throw error with message sizeYNotValid', () => {
                    expectToThrowSizeYNotValid(-1);
                });
            });
        });
    });

    // here we are testing the function that tries to create a rover
    describe('.createRover', () => {
        // setup a dummy platue before each of these tests
        let platue = null;
        let dummyRoverInfo = null;

        beforeEach(() => {
            platue = new Platue(defaultSizeX, defaultSizeY);
            dummyRoverInfo = {
                x: defaultX,
                y: defaultY,
                cardinal_point: defaultCardinal,
                movement_instruction: defaultMovementInstruction
            };
        });

        describe('valid data', () => {
            it('will return a rover object', () => {
                expect(platue.createRover(dummyRoverInfo)).toBeInstanceOf(Rover);
            });
        });

        describe('invalid data', () => {
            it('will add an error to the roverErrors array', () => {
                expect(platue.roverErrors.length).toEqual(0);
                dummyRoverInfo.x = -1;
                platue.createRover(dummyRoverInfo);
                expect(platue.roverErrors.length).toEqual(1);
            });

            it('will return false', () => {
                dummyRoverInfo.x = -1;
                expect(platue.createRover(dummyRoverInfo)).toBeFalsy();
            });
        });
    });

    
});

// Here are some helper functions for the tests
const expectValueToBeStored = function (property, value) {
    try {
        let platue = new Platue(defaultSizeX, defaultSizeY);
        expect(platue[property]).toEqual(value);
    } catch (error) {
        expect(error).toBeUndefined();
    }
};

const expectToThrowSizeXNotValid = function (invalidSizeX) {
    expect(() => {
        let platue = new Platue(invalidSizeX, defaultSizeY);
    }).toThrow('sizeXNotValid');
};

const expectToThrowSizeYNotValid = function (invalidSizeY) {
    expect(() => {
        let platue = new Platue(defaultSizeX, invalidSizeY);
    }).toThrow('sizeYNotValid');
};
