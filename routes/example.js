const express = require('express');
const Example = require('../models/Example')


const router = express.Router();

router.get('/', (req, res) => {
    Example.find({}, function(err, examples) {
        res.send(examples)
    });})


module.exports = router