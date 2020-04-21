const express = require('express');
const Synth = require('../models/Synth')


const router = express.Router();

router.get('/', (req, res) => {
    Synth.find({}, function(err, synths) {
        res.send(synths)
    });
})


module.exports = router