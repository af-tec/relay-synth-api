const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;


passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async ( email, password, done) => {
    try {
        const user = await User.create({ 
            email, 
            password
         });

        return done(null, user);
    } catch (e) {
        return done(e);
    }
}));

passport.use('login', new localStrategy({ usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'User not found'});
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
        return done(null, false, {message: 'Incorrect password'});
    }
    return done(null, user, { message: 'Logged in successfully'});
})
)
    


passport.use(new jwtStrategy({
    secretOrKey : process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtFromRequest : extractJwt.fromHeader('auth-token')
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));