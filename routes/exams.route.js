const express = require('express');
const router = express.Router();

const examsController = require('../controllers/exams.controller');

router.get('/', examsController.index);

module.exports = router;