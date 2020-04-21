const User = require('../models/User');



exports.getScores = async (req, res) => {
    User.find({}, {"_id": 0,"email" : 1, "totalScore": 1, "tutorialsCompleted": 1}, (err, users) => {
        res.send({ users })
    }).sort({"totalScore": "desc"});
}