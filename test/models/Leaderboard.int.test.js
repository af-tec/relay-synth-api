const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../server');


chai.use(chaiHttp);

describe('Leaderboards route /leaderboard/', function() {
    it('should return a valid 200 response to this route when a token is set', function(done) {
        chai.request(app)
            .get('/leaderboard/')
            .set('auth-token','literally anything')
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.token).to.equal('literally anything');
            })
            done();

    })
    it('should return all the user scores and their emails', function(done) {
        chai.request(app)
        .get('/leaderboard/')
        .set('auth-token', 'anything')
        .end((err, res) => {
            if (err) done(err);
            expect(res.users).to.be.an('array');
            expect(res.users).to.have.ordered.members;
        })
        done();
    })
})