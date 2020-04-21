const mongoose = require('mongoose');
Schema = mongoose.Schema


const SynthSchema =  new mongoose.Schema({

    parameters: {
        type: JSON,
        required: true
    }
});


module.exports = mongoose.model('Synth' ,SynthSchema);