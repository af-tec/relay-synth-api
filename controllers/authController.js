
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.signup = async (req, res, next) => {

    const token = jwt.sign({ user: req.user }, process.env.JWT_ACCESS_TOKEN_SECRET);

    res.status(201).send({
            auth: true,
            token: token,
            user: req.user
        });
    
}

exports.login = async (req, res, next) => {
    passport.authenticate('login', async(err,user,info) => {
    if (err || !user) {
        const error = new Error('An error occurred');
        return next(error);
    }else {
        req.login(user,{session: false}, async (error) => {
            const body = {_id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: 604800 });
            return res.status(200).send({ auth: true, token: token, user: user});
        });
    }
})
    (req,res, next);
};

