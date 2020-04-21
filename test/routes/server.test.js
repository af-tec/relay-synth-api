const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../server');

chai.use(chaiHttp);


describe('home route', () => {
    it('returns a 200 response', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200);
            done();
        })
    })
    it('returns a message with the server address', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            if (err) done(err);
            expect(res.body).be.deep.equal({
                message:  `Hi! Server is listening on https://localhost:8000`
            })
            done();
        })
        
    })
})