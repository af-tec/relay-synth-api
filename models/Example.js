const mongoose = require('mongoose');
Schema = mongoose.Schema

const ExampleSchema = new mongoose.Schema({


    note:{
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    interval: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Example', ExampleSchema);