const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');

router.post('/run',submissionController.RunProblem);
module.exports = router;