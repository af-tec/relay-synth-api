var chai = require('chai');
var expect = chai.expect;
var Synth = require('../../models/Synth');


describe('Invalid Synth', function() {
    var synth1;
    before(function() {
        synth1 = new Synth();
    })
    describe('parameters required', function() {
        it('Should be invalid if there are no parameters', function(done) {
            synth1.validate(function(err) {
                expect(err.errors.parameters).to.exist;
                done();
            })
        })
    })
})

describe('Valid Synth', function() {
    var synth2;
    before(function() {
        const params  = {
            oscillator: {
                type: 'sawtooth'
            },
            envelope: {
                attack: 0.25,
                decay: 0.25,
                sustain: 1.0,
                release: 1.0
            }
        }
        synth2 = new Synth({parameters: params});
    })
    describe('parameters', function() {
        it('Should be a valid JSON object if there are parameters', function(done) {
            synth2.validate(function() {
                expect(synth2.parameters).to.be.a('Object');
                expect(synth2.parameters.oscillator.type).to.equal('sawtooth');
                expect(synth2.parameters.envelope.attack).to.equal(0.25);
                expect(synth2.parameters.envelope.decay).to.equal(0.25);
                expect(synth2.parameters.envelope.sustain).to.equal(1.0);
                expect(synth2.parameters.envelope.release).to.equal(1.0);
                done();
            })
        })
    })
})