var chai = require('chai');
var expect = chai.expect;
var User = require('../../models/User');

describe('Invalid User', function() {
    var user1;
    before(function() {
        user1 = new User();

    })
    describe('required email', function() {
        it('Should be invalid if no email', function(done) {
            user1.validate(function(err) {
                expect(err.errors.email).to.exist;
                done();

            })
        })
    })
    describe('required password', function() {
        it('Should be invalid if no password', function(done) {
            user1.validate(function(err) {
                expect(err.errors.password).to.exist;
                done();
            })
        })
    })
})
describe('Valid User', function() {
    var user2;
    before(function() {
        user2 = new User({ email: 'test@outlook.com', password: 'Testing123!'} )
    })
    describe('correct email', function() {
        it('Email should be test@outlook.com', function(done) {
            user2.validate(function() {
                expect(user2.email).to.equal('test@outlook.com');
                done();
            });
        })
    })
    describe('correct unhashed password', function()  {

        it('Password should be Testing123! before hashing', function(done) {
            user2.validate(function() {
                expect(user2.password).to.equal('Testing123!');
                done();
            })
        }); 
    })
    describe('correct default totalScore', function() {
        it('totalScore should be 0 when created', function(done) {
            user2.validate(function() {
                expect(user2.totalScore).to.equal(0);
                done();
            })
        })
    })
    describe('correct default tutorials', function() {
        it('tutorialsCompleted should be empty when created', function(done) {
            user2.validate(function() {
                expect(user2.tutorialsCompleted).to.be.an('array').that.is.empty;
                done();
            })
        })
    })

    describe('password hashing functions', function() {
        var hashedPassword;
        describe('hashing password', function() {
            it('password should be hashed correctly and not equal Testing123!', function(done) {
                user2.validate(async function() {
                    hashedPassword = await user2.hashPassword('Testing123!');
                    user2.password = hashedPassword;
                    expect(user2.password).to.not.equal('Testing123!');
                    done();
                    
                })
            })
        })
        describe('password validation', function() {
            it('should return true if passwords match', function(done) {
                user2.validate(async function() {
                    compareResult = await user2.isValidPassword('Testing123!');
                    expect(compareResult).to.be.true;
                    done();
                })
            })

            it('should return false if passwords do not match', function(done) {
                user2.validate(async function() {
                    compareResult = await user2.isValidPassword('MostDefinitelyNotTesting123!');
                    expect(compareResult).to.be.false;
                    done();
                })
            })

        })

    })
})
