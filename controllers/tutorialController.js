const Tutorial = require('../models/Tutorial');



exports.getTutorials = async(req, res) => {
    Tutorial.find({}, function(err, tutorials) {
        res.send(tutorials);
    }).sort('number');
}

exports.getTutorialCount = async(req, res) => {
    Tutorial.countDocuments({}, function(err, number) {
        if (err) return res.status(500).send({ message :"Could not count level total" } );
        res.status(200).send({total: number} );
    })
}

exports.getTutorialTitles = async(req, res) => {
    Tutorial.find({}, {'number': 1, 'name': 1,'category': 1,
    'difficulty': 1,'pointsAvailable':1}, function(err, titles ) {
        res.send(titles);
    }).sort('number');
}



exports.getTutorialFromId = async(req, res) => {
    const id = Number(req.params.id);
    Tutorial.findOne({'number': id})
    .populate('synth')
    .populate('example')
    .exec(function(err, data) {
        if (err) return res.status(500).send({ message :"Invalid ID" } );
        res.send(data)
    });
}

exports.getTutorialText = async(req, res) => {
    const id = Number(req.params.id);
    Tutorial.findOne({'number': id}).exec(function(err, tutorialData) {
        if (err) return res.status(500).send({ message :"Invalid ID" } );
        res.send(tutorialData);
    });
}

exports.getTutorialSynth = async (req, res) => {
    const id = Number(req.params.id);
    Tutorial.findOne({'number': id}, 'polyphony type')
    .sort('number')
    .select('synth')
    .populate('synth')
    .exec(function(err, synthData) {
        if (err) return res.status(500).send({ message :"Invalid ID" } );
        const data = {
            polyphony: synthData.synth.polyphony,
            type: synthData.synth.type,
            parameters: synthData.synth.parameters
        }
        res.send(data);
    });
}

exports.getSynthSettings = async(req, res) => {
    const id = Number(req.params.id);
    Tutorial.findOne({'number': id})
    .sort('number')
    .select('synth')
    .populate('synth')
    .exec(function(err, synthData) {
        if (err) return res.status(500).send({ message :"Invalid ID" } );
        if (err) return res.status(500).send({ message :"Invalid ID" } );
        const data = {
            polyphony: synthData.synth.polyphony,
            type: synthData.synth.type,
        }

        res.send(data);
    });
}
exports.getTutorialSynthParams = async(req, res) => {
    const id = Number(req.params.id);
    Tutorial.findOne({'number': id})
    .sort('number')
    .select('synth')
    .populate('synth')
    .exec(function(err, synthData) {
        if (err) return res.status(500).send({ message :"Invalid ID" } );
        if (err) return res.status(500).send({ message :"Invalid ID" } );
        const data = {
            parameters: synthData.synth.parameters
        }

        res.send(data);
    });
}
exports.getTutorialExample = async (req, res) => {

    const id = Number(req.params.id);
    Tutorial.findOne({'number': id})
    .select('example')
    .populate('example')
    .exec(function(err, exampleData) {
        if (err) return res.status(500).send({ message :"Invalid ID" } );
        res.send(exampleData);
    });
}