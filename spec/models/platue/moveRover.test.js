const expect = require('expect');
const Platue = require('../../../models/Platue');
const Rover = require('../../../models/Rover');

// for the Platue
const defaultSizeX = 5;
const defaultSizeY = 5;

// here we are testing that each individual rover will move to the correct position
describe('platue', () => {
    let platue = null;

    describe('.moveRover', () => {
        beforeEach(() => {
            platue = new Platue(defaultSizeX, defaultSizeY);
        });

        describe('first rover', () => {
            let firstRover = null;

            beforeEach(() => {
                firstRover = new Rover(1, 2, 'N', 'LMLMLMLMM');
                platue.moveRover(firstRover);
            });

            it('will move mars rover', () => {
                expect(firstRover.x).toEqual(1);
                expect(firstRover.y).toEqual(3);
                expect(firstRover.cardinalPoint).toEqual('N');
            });

            it('will add the rover to the list of rovers on the platue', () => {
                expect(platue.rovers).toContain(firstRover);
            });

            it('will add the position of the rover to the positions array', () => {
                expect(platue.roverPositions).toContain('1,3');
            });
        });

        describe('second rover', () => {
            let secondRover = null;

            beforeEach(() => {
                secondRover = new Rover(3, 3, 'E', 'MMRMMRMRRM');
                platue.moveRover(secondRover);
            });

            it('will move mars rover', () => {
                expect(secondRover.x).toEqual(5);
                expect(secondRover.y).toEqual(1);
                expect(secondRover.cardinalPoint).toEqual('E');
            });

            it('will add the rover to the list of rovers on the platue', () => {
                expect(platue.rovers).toContain(secondRover);
            });

            it('will add the position of the rover to the positions array', () => {
                expect(platue.roverPositions).toContain('5,1');
            });
        });
    });
});