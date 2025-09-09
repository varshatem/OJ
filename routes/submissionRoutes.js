const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

router.post('/run',submissionController.RunProblem);

router.post('/run-system',submissionController.RunOnSystem);

module.exports = router;