const express = require('express');
const router = express.Router();
const tutorialController = require('../controllers/tutorialController')



router.get('/', tutorialController.getTutorials);

router.get('/count', tutorialController.getTutorialCount);

router.get('/titles', tutorialController.getTutorialTitles);

router.get('/:id',tutorialController.getTutorialFromId);

router.get('/:id/text', tutorialController.getTutorialText);

router.get('/:id/synth' ,  tutorialController.getTutorialSynth);

router.get('/:id/synth/settings', tutorialController.getSynthSettings);

router.get('/:id/synth/parameters', tutorialController.getTutorialSynthParams);

router.get('/:id/example', tutorialController.getTutorialExample);


module.exports = router