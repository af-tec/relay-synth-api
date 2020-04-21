var chai = require('chai');
var expect = chai.expect;
const chaiHttp = require('chai-http');
var app = require('../../server');
var Example = require('../../models/Tutorial');
var sinon = require('sinon');




chai.use(chaiHttp);


describe('Examples route /examples', function() {
    before(function() {
        sinon.stub(Example,'find')
    })
    it('should return a valid 200 response to this route when a token is set', function(done) {
        chai.request(app)
            .get('/examples/')
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
        .get('/examples/')
        .set('auth-token', 'anything')
        .end((err, res) => {
            if (err) done(err);
            expect(res).to.be.an('array');
            expect(res).to.have.ordered.members;

        })
        done();
    })
})