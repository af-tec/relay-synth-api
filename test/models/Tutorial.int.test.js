var chai = require('chai');
var expect = chai.expect;
const chaiHttp = require('chai-http');
var app = require('../../server');
var Tutorial = require('../../models/Tutorial');
var sinon = require('sinon');

chai.use(chaiHttp);



describe('Tutorial route /tutorials/', function() {

    it('should return a valid 200 response to this route when a token is set', function(done) {
        chai.request(app)
            .get('/tutorials/')
            .set('auth-token','literally anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.token).to.equal('literally anything');
            })
            done();

    })
    it('should return all the tutorials and their data', function(done) {
        chai.request(app)
        .get('/tutorials/')
        .set('auth-token', 'anything')
        .end((err, res) => {
            if (err) done(err);
            expect(res).to.be.an('array');
            expect(res).to.have.ordered.members;

        })
        done();
    })
    describe('Tutorial title route /tutorials/titles', function() {
        it('should return all the tutorial titles and their number', function(done) {
            chai.request(app)
            .get('/tutorials/titles')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.be.an('array');
                expect(res).to.have.ordered.members;
    
            })
            done();
        })
    })
    describe('Tutorial total route /tutorials/count ', function() {
        it('should return a valid 200 response and the total number of tutorials ', function(done) {
            chai.request(app)
            .get('/tutorials/count')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.message).to.be.a('number');
    
            })
            done();
        })
    })

    describe('Tutorial text route /tutorials/:id/text', function() {
        it('should return a valid 200 response to this route when a valid tutorial number (1) is given', function(done) {
            chai.request(app)
            .get('/tutorials/1')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.number).to.equal(1);
                expect(res.name).to.be.a('string');
                expect(res.category).to.be.a('string');
                expect(res.text).to.be.a('string');
                expect(res.difficulty).to.be.a('string');
                expect(res.difficulty).to.be.a('number');

            })
            done();
        })
        it('should return a 500 response to this route when an invalid tutorial number (134fh) is given', function(done) {
            chai.request(app)
            .get('/tutorials/134fh')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(500);
                expect(res.message).to.equal('Invalid ID');
            })
            done();
        })
    })
    describe('Tutorial text route /tutorials/:id/text', function() {
        it('should return a valid 200 response to this route when a valid tutorial number (1) is given', function(done) {
            chai.request(app)
            .get('/tutorials/1/synth')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.synth).to.be.a('json');
            })
            done();
        })
        it('should return a 500 response to this route when an invalid tutorial number (134fh) is given', function(done) {
            chai.request(app)
            .get('/tutorials/134fh/synth')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(500);
                expect(res.message).to.equal('Invalid ID');
            })
            done();
        })
    })
    describe('Tutorial text route /tutorials/:id/text', function() {
        it('should return a valid 200 response to this route when a valid tutorial number (1) is given', function(done) {
            chai.request(app)
            .get('/tutorials/1/text')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.number).to.equal(1);
                expect(res.name).to.be.a('string');
                expect(res.category).to.be.a('string');
                expect(res.text).to.be.a('string');
                expect(res.difficulty).to.be.a('string');
                expect(res.difficulty).to.be.a('number');            
            })
            done();
        })
        it('should return a 500 response to this route when an invalid tutorial number (134fh) is given', function(done) {
            chai.request(app)
            .get('/tutorials/134fh/text')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(500);
                expect(res.message).to.equal('Invalid ID');
            })
            done();
        })
    })
    describe('Tutorial example route /tutorials/:id/text', function() {
        it('should return a valid 200 response to this route when a valid tutorial number (1) is given', function(done) {
            chai.request(app)
            .get('/tutorials/1/example')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
         
            })
            done();
        })
        it('should return a 500 response to this route when an invalid tutorial number (134fh) is given', function(done) {
            chai.request(app)
            .get('/tutorials/134fh/example')
            .set('auth-token', 'anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(500);
                expect(res.message).to.equal('Invalid ID');
            })
            done();
        })
    })
})