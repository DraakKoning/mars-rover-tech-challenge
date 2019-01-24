const expect = require('expect');
const Platue = require('../../../models/Platue');
const Rover = require('../../../models/Rover');

// for the Platue
const defaultSizeX = 5;
const defaultSizeY = 5;

// here we are testing that we can add multiple rovers
describe('platue', () => {
    let platue = null;

    describe('.addRovers', () => {
        beforeEach(() => {
            platue = new Platue(defaultSizeX, defaultSizeY);
        });

        describe('non array value passed', () => {
            it('will throw a roversNotAnArray error', () => {
                expect(() => platue.addRovers('bla')).toThrow('roversNotAnArray');
            });
        });

        describe('array of rover values passed in', () => {
            it('will place all the rovers on the platue', () => {
                const rovers = [{
                    "x": 1,
                    "y": 2,
                    "cardinal_point": "N",
                    "movement_instruction": "LMLMLMLMM"
                },
                {
                    "x": 3,
                    "y": 3,
                    "cardinal_point": "E",
                    "movement_instruction": "MMRMMRMRRM"
                }];

                let firstRover = new Rover(1, 3, 'N', 'LMLMLMLMM');
                let secondRover = new Rover(5, 1, 'E', 'MMRMMRMRRM');

                platue.addRovers(rovers);
                expect(platue.rovers).toContainEqual(firstRover);
                expect(platue.rovers).toContainEqual(secondRover);
            });
        });
    });
});