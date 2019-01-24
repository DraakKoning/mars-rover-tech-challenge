const expect = require('expect');
const Platue = require('../../models/Platue');

const defaultSizeX = 2;
const defaultSizeY = 3;

describe('Platue model', () => {
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
