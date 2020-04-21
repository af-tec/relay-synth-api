
var chai = require('chai');
var expect = chai.expect;
var Example = require('../../models/Example');



describe('Invalid Example', function() {
    var example1;
    before(function() {
        example1 = new Example();
    })
    describe('note required', function() {
        it('Should be invalid if there is no note', function(done) {
            example1.validate(function(err) {
                expect(err.errors.note).to.exist;
                done();
            })
        })
    })
    describe('note required', function() {
        it('Should be invalid if there is no duration', function(done) {
            example1.validate(function(err) {
                expect(err.errors.duration).to.exist;
                done();
            })
        })
    })
    describe('note required', function() {
        it('Should be invalid if there is no interval', function(done) {
            example1.validate(function(err) {
                expect(err.errors.interval).to.exist;
                done();
            })
        })
    })
})
describe('Valid Example', function() {
    var example2;
    before(function() {
        example2 = new Example({note: 'C4', duration: '8n', interval: '4n'});
    })
    describe('Note', function() {
        it('Should be a valid piano note', function(done) {
            example2.validate(function() {
                expect(example2.note).to.be.a('String');
                expect(example2.note).to.equal('C4');
                done();
            })
        })
    })
    describe('Duration', function() {
        it('Should be a valid note duration', function(done) {
            example2.validate(function() {
                expect(example2.duration).to.be.a('String');
                expect(example2.duration).to.equal('8n');
                done();
            })
        })
    })
    describe('Interval', function() {
        it('Should be a valid note interval', function(done) {
            example2.validate(function() {
                expect(example2.interval).to.be.a('String');
                expect(example2.interval).to.equal('4n');
                done();
            })
        })
    })
})