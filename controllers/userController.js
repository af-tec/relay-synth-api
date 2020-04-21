const User = require('../models/User');
const mongoose = require('mongoose');

exports.getProfile = async(req, res) => {
    const user = await User.findOne({'email': req.body.email}).exec();
    res.send(user);
}

exports.updateScore = async(req, res, next) => {
    User.findOne({"email": req.body.email}).exec(function(err, user) {
        if(err || user  === null) return res.status(500).send({ message :"Invalid request" } )
        user.totalScore += Number(req.body.tutorialScore);
        user.save();
        res.send(user);
        next();
    })
}

exports.updateTutorialsCompleted = async (req, res, next) => {
    User.findOne({"email": req.body.email}).exec(function(err, user) {
        if(err || user  === null) return res.status(500).send({ message :"Invalid request" } )
        let tutorialId = Number(req.body.tutorialId);
        if(user.tutorialsCompleted.includes(tutorialId)) {
            res.send({ message: "Tutorial already completed"});
            next();
        }
        else {
            user.tutorialsCompleted.push(tutorialId);
            user.save();
            res.send(user);
            next();
        }
    })
}