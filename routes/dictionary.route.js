const express = require('express');
const router = express.Router();

const dictionaryController = require('../controllers/dictionary.controller');

router.get('/:slug', dictionaryController.search);
router.get('/', dictionaryController.index);

module.exports = router;