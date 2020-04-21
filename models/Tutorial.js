const mongoose = require('mongoose');
Schema = mongoose.Schema


const TutorialSchema = new mongoose.Schema({


    number: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true

    },
    pointsAvailable: {
        type: Number,
        required: true

    },
    difficulty: {
        type: String,
        required: true

    },
    synth: {
        type: Schema.Types.ObjectId,
        ref: 'Synth'
    },
    effect: {
        type: Schema.Types.ObjectId,
        ref: 'Effect'
    },
    example: {
        type: Schema.Types.ObjectId,
        ref: 'Example'
    },

});


module.exports = mongoose.model('Tutorial', TutorialSchema)