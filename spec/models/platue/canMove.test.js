const expect = require('expect');
const Platue = require('../../../models/Platue');
const Rover = require('../../../models/Rover');

// for the Platue
const defaultSizeX = 2;
const defaultSizeY = 3;

// for the rovers
const defaultX = 2;
const defaultY = 3;
const defaultCardinal = 'N';
const defaultMovementInstruction = 'LMRRRM';

describe('.canMove', () => {
    let platue = null;
    let rover = null;

    beforeEach(() => {
        platue = new Platue(5, 5);
        rover = new Rover(defaultX, defaultY, defaultCardinal, defaultMovementInstruction);
    });

    describe('rover.x', () => {
        describe('is 0', () => {
            beforeEach(() => {
                rover.x = 0;
            });

            describe('and rover is facing N', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'N';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });

            describe('and rover is facing E', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'E';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });

            describe('and rover is facing S', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'S';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });

            describe('and rover is facing W', () => {
                it('will return false', () => {
                    rover.cardinalPoint = 'W';
                    expect(platue.canMove(rover)).toBeFalsy();
                });
            });
        });
    });

    describe('rover.x', () => {
        describe('is the grids maximum value', () => {
            beforeEach(() => {
                rover.x = 5;
            });

            describe('and rover is facing N', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'N';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });

            describe('and rover is facing E', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'E';
                    expect(platue.canMove(rover)).toBeFalsy();
                });
            });

            describe('and rover is facing S', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'S';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });

            describe('and rover is facing W', () => {
                it('will return false', () => {
                    rover.cardinalPoint = 'W';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });
        });
    });

    describe('rover.y', () => {
        describe('is 0', () => {
            beforeEach(() => {
                rover.y = 0;
            });

            describe('and rover is facing N', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'N';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });

            describe('and rover is facing E', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'E';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });

            describe('and rover is facing S', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'S';
                    expect(platue.canMove(rover)).toBeFalsy();
                });
            });

            describe('and rover is facing W', () => {
                it('will return false', () => {
                    rover.cardinalPoint = 'W';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });
        });
    });

    describe('rover.y', () => {
        describe('is the grids maximum value', () => {
            beforeEach(() => {
                rover.y = 5;
            });

            describe('and rover is facing N', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'N';
                    expect(platue.canMove(rover)).toBeFalsy();
                });
            });

            describe('and rover is facing E', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'E';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });

            describe('and rover is facing S', () => {
                it('will return true', () => {
                    rover.cardinalPoint = 'S';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });

            describe('and rover is facing W', () => {
                it('will return false', () => {
                    rover.cardinalPoint = 'W';
                    expect(platue.canMove(rover)).toBeTruthy();
                });
            });
        });
    });

    describe('other rover in the way', () => {
        beforeEach(() => {
            rover.x = defaultSizeX;
            rover.y = defaultY;
            rover.cardinalPoint = 'N';
        });

        it('will return false', () => {
            const firstRover = new Rover(defaultX, defaultY + 1, defaultCardinal, defaultMovementInstruction);
            platue.rovers.push(firstRover);
            platue.roverPositions.push(firstRover.positionToString());
    
            expect(platue.canMove(rover)).toBeFalsy();
        });
    });
});