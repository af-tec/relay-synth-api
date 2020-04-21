const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController')

router.get('/profile', userController.getProfile);
 
router.patch('/update/score', userController.updateScore);

router.patch('/update/tutorials', userController.updateTutorialsCompleted);

module.exports = router