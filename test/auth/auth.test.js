const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../server');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

chai.use(chaiHttp);

before(() => {
    sinon.stub(jwt, 'verify').callsFake(function() {
        return Promise.resolve({success: 'valid token'})
    });
})


after(() => {
    sinon.restore();
})


describe('signup route', function() {
    let minute = new Date().getMinutes();
    let email = `test${minute}@test.com`;
    let password = 'Testing123!'
    it('Should return a 200 response if valid email and password', async function () {
        const res = await chai.request(app)
            .post('/signup')
            .send({
                email: email,
                password: password
            });
        expect(res).to.have.status(201);

    })
    it('Should return a 500 response if request with same email attemptted', async function() {
        const res = await chai.request(app)
            .post('/signup')
            .send({
                email: email,
                password: password
        });
    expect(res).to.have.status(500);

    })
})
describe('login route', () => {
    let minute = new Date().getMinutes();
    let email = `test${minute}@test.com`;
    let password = 'Testing123!'
    it('should return a 200 response if valid email and password for login', async function() {
        const res = await chai.request(app)
            .post('/login')
            .send({
                email: email,
                password: password
        });
        expect(res).to.have.status(200);
    })
    it('should return a 500 response if invalid email and password for login', async function() {
        const res = await chai.request(app)
            .post('/login')
            .send({
                email: 'nottestmctesterson@test.com',
                password: 'NotTesting123!'
        });
        expect(res).to.have.status(500);
    })
    it('should return a 500 response if valid email and password for login', async function() {
        const res = await chai.request(app)
            .post('/login')
            .send({
                email: email,
                password: 'NotTesting123!'
        });
        expect(res).to.have.status(500);
    })
})
describe('user (auth token) route', () => {
/*     it('should return a valid 200 response to this route when a token is set', function(done) {
        let minute = new Date().getMinutes().toString();
        chai.request(app)
            .get('/users/profile')
            .set('auth-token',minute)
            .end((err, res) => {
                if (err) done(err);
                expect(res).to.have.status(200);
                expect(res.token).to.equal(minute);
            })
            done();
    })
    it('should return 401 response if no token is set', function(done) {
        chai.request(app)
            .get('/users/profile')
            .end((err, res) => {
                if(err) done(err);
                expect(res).to.have.status(401);
            })
            done();
    }) 
    
    it('should return a valid 201 response when the users score has been updated', function() {
        chai.request(app)
        .patch('/users/update/score')
        .set('auth-token','literally anything')
        .send({
            email: 'testmctesterson@test.com',
            levelScore: 100
        }).end((err, res) => {
            if(err) done(err);
            expect(res).to.have.status(200);
            expect(res.email).to.equal('testmctesterson@test.com');
         })
    })
    it('should return a 500  response when an invalid email is provided to update users scores', function() {
        chai.request(app)
        .patch('/users/update/score')
        .set('auth-token','literally anything')
        .send({
            email: 'nottestmctesterson@test.com',
            levelScore: 100
        }).end((err, res) => {
            if(err) done(err);
            expect(res).to.have.status(500);
            expect(res.message).to.equal('Invalid email');
         })
    })
    it('should return a valid 201 response when the users tutorialsCompleted array has been updated', async function() {
        chai.request(app)
        .patch('/users/update/score')
        .set('auth-token','literally anything')
        .send({
            email: 'testmctesterson@test.com',
            levelId: "5e7a03861c9d44000096d829"
        }).end((err, res) => {
            if(err) done(err);
            expect(res).to.have.status(200);
            expect(res.email).to.equal('testmctesterson@test.com')
            expect(res.tutorialsCompleted).to.deep.equal('5e7a03861c9d44000096d829');
         })
    })
    it('should return a 500 response when the users tutorialsCompleted array has been updated with a duplicate', async function() {
        chai.request(app)
        .patch('/users/update/score')
        .set('auth-token','literally anything')
        .send({
            email: 'testmctesterson@test.com',
            levelId: "5e7a03861c9d44000096d829"
        }).end((err, res) => {
            if(err) done(err);
            expect(res).to.have.status(500);
            expect(res.email).to.equal('testmctesterson@test.com')
            expect(res.tutorialsCompleted).to.deep.equal('5e7a03861c9d44000096d829');
            expect(res.message).to.equal('Tutorial already completed');

        })
    })
    it('should return a 500  response when an invalid email is provided to update users scores', async function() {
        chai.request(app)
        .patch('/users/update/score')
        .set('auth-token','literally anything')
        .send({
            email: 'nottestmctesterson@test.com',
            levelId: "5e7a03861c9d44000096d829"
        }).end((err, res) => {
            if(err) done(err);
            expect(res).to.have.status(500);
            expect(res.message).to.equal('Invalid email');
         })
    }) */

})
