const expect = require('expect');
const request = require('supertest');

const { app } = require('../../bin/www');

let defaultBody = {};

describe('main routes', () => {
    beforeEach(() => {
        defaultBody = {
            "platue": {
                "size_x": 5,
                "size_y": 5,
                "rovers": [{
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
                }]
            }
        };
    });

    describe('explore_mars', () => {
        describe('validation', () => {
            describe('size_x', () => {
                describe('is not present', () => {
                    beforeEach(() => {
                        delete defaultBody.platue.size_x;
                    });
                    it('will return 400', (done) => {
                        returnsErrorCode400(done);
                    });

                    it('will return errorType invalidRequest', (done) => {
                        returnsErrorTypeinvalidRequest(done);
                    });
                });

                describe('is not an int', () => {
                    beforeEach(() => {
                        defaultBody.platue.size_x = 'notAnInt';
                    });
                    it('will return 400', (done) => {
                        returnsErrorCode400(done);
                    });

                    it('will return errorType invalidRequest', (done) => {
                        returnsErrorTypeinvalidRequest(done);
                    });
                });

                describe('is less than 1', () => {
                    beforeEach(() => {
                        defaultBody.platue.size_x = 0;
                    });
                    it('will return 400', (done) => {
                        returnsErrorCode400(done);
                    });

                    it('will return errorType invalidRequest', (done) => {
                        returnsErrorTypeinvalidRequest(done);
                    });
                });
            });

            describe('size_y', () => {
                describe('is not present', () => {
                    beforeEach(() => {
                        delete defaultBody.platue.size_y;
                    });
                    it('will return 400', (done) => {
                        returnsErrorCode400(done);
                    });

                    it('will return errorType invalidRequest', (done) => {
                        returnsErrorTypeinvalidRequest(done);
                    });
                });

                describe('is not an int', () => {
                    beforeEach(() => {
                        defaultBody.platue.size_y = 'notAnInt';
                    });
                    it('will return 400', (done) => {
                        returnsErrorCode400(done);
                    });

                    it('will return errorType invalidRequest', (done) => {
                        returnsErrorTypeinvalidRequest(done);
                    });
                });

                describe('is less than 1', () => {
                    beforeEach(() => {
                        defaultBody.platue.size_y = 0;
                    });
                    it('will return 400', (done) => {
                        returnsErrorCode400(done);
                    });

                    it('will return errorType invalidRequest', (done) => {
                        returnsErrorTypeinvalidRequest(done);
                    });
                });
            });

            describe('rovers', () => {
                describe('is not present', () => {
                    beforeEach(() => {
                        delete defaultBody.platue.rovers;
                    });
                    it('will return 400', (done) => {
                        returnsErrorCode400(done);
                    });

                    it('will return errorType invalidRequest', (done) => {
                        returnsErrorTypeinvalidRequest(done);
                    });
                });

                describe('is empty', () => {
                    beforeEach(() => {
                        defaultBody.platue.rovers = [];
                    });
                    it('will return 400', (done) => {
                        returnsErrorCode400(done);
                    });

                    it('will return errorType invalidRequest', (done) => {
                        returnsErrorTypeinvalidRequest(done);
                    });
                });
            });
        });

        describe('using google\'s test case', () => {
            it('will return code 200', (done) => {
                request(app)
                    .post('/explore_mars')
                    .send(defaultBody)
                    .expect(200)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        done();
                    });
            });

            it('will return a result object containing the new positions of the rovers', (done) => {
                const expectedValues = [{
                    x: 1,
                    y: 3,
                    cardinalPoint: 'N',
                    movementInstruction: 'LMLMLMLMM'
                },
                {
                    x: 5,
                    y: 1,
                    cardinalPoint: 'E',
                    movementInstruction: 'MMRMMRMRRM'
                } ];

                request(app)
                    .post('/explore_mars')
                    .send(defaultBody)
                    .expect((res) => {
                        expect(res.body.result).toEqual(expectedValues);
                    })
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        done();
                    });
            });
        });
    });
});

// some helper test functions
const returnsErrorCode400 = function (done) {
    request(app)
        .post('/explore_mars')
        .send(defaultBody)
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
};

const returnsErrorTypeinvalidRequest = function (done) {
    request(app)
        .post('/explore_mars')
        .send(defaultBody)
        .expect((res) => {
            expect(res.body.errorType).toEqual('invalidRequest');
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            done();
        });
};
