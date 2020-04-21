var chai = require('chai');
var expect = chai.expect;
var app = require('../../server');
var Tutorial = require('../../models/Tutorial');

describe('Invalid Tutorial', function() {
    var tutorial1
    before(function() {
         tutorial1 = new Tutorial();
    })

    describe('required number', function() {
        it('Should be invalid if no level number', function(done) {
            tutorial1.validate(function(err) {
                expect(err.errors.number).to.exist;
                done();
            })
        })

    })
    describe('required name', function() {
        it('Should be invalid if no name', function(done) {
            tutorial1.validate(function(err) {
                expect(err.errors.name).to.exist;
                done();
            })
        })
    })
    describe('required category', function() {
        it('Should be invalid if no category', function(done) {
            tutorial1.validate(function(err) {
                expect(err.errors.category).to.exist;
                done();
            })
        })
    })
    describe('required text', function() {
        it('Should be invalid if no text', function(done) {
            tutorial1.validate(function(err) {
                expect(err.errors.text).to.exist;
                done();
            })
        })
    })
    describe('required pointsAvailable', function() {
        it('Should be invalid if no pointsAvailable', function(done) {
            tutorial1.validate(function(err) {
                expect(err.errors.pointsAvailable).to.exist;
                done();
            })
        })
    })
    describe('required difficulty', function() {
        it('Should be invalid if no difficulty', function(done) {
            tutorial1.validate(function(err) {
                expect(err.errors.pointsAvailable).to.exist;
                done();
            })
        })
    })

})
describe('Valid Tutorial', function() {
    var tutorial2;
    var tutorial3;

    before(function() {
        tutorial2 = new Tutorial({number: 1, name: "Sine Waves",
        category: "Waveforms", text: "This is a lesson about sine waves and what they are useful for",
        pointsAvailable: 100, difficulty: "Easy"});
        tutorial3 = new Tutorial({number: 1, name: "Square Waves",
        category: "Waveforms", text: "This is a lesson about square waves and what they are useful for",
        pointsAvailable: 100, difficulty: "Easy"});
    })

    describe('valid number', function() {
        it('Should be equal to 1', function(done) {
            tutorial2.validate(function() {
                expect(tutorial2.number).to.equal(1);
                done();
            })
        })
    })
    describe('valid title', function() {
        it('Should be equal to Sine Waves', function(done) {
            tutorial2.validate(function() {
                expect(tutorial2.name).to.equal('Sine Waves');
                done();
            })
        })
    })
    describe('valid category', function() {
        it('Should be equal to Waveforms', function(done) {
            tutorial2.validate(function() {
                expect(tutorial2.category).to.equal('Waveforms');
                done();
            })
        })
    })
    describe('valid text', function() {
        it('Should be equal to This is a lesson about sine waves and what they are useful for', function(done) {
            tutorial2.validate(function() {
                expect(tutorial2.text).to.equal('This is a lesson about sine waves and what they are useful for');
                done();
            })
        })
    })
    describe('valid pointsAvailable', function() {
        it('Should be equal to 100', function(done) {
            tutorial2.validate(function() {
                expect(tutorial2.pointsAvailable).to.equal(100);
                done();
            })
        })
    })
    describe('valid difficulty', function() {
        it('Should be equal to Easy', function(done) {
            tutorial2.validate(function() {
                expect(tutorial2.difficulty).to.equal('Easy');
                done();
            })
        })
    })
}) 