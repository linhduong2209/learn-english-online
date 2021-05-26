const express = require('express');
const router = express.Router();

const AdController = require('../controllers/ad.controller');

router.get('/create', AdController.create);
router.post('/store', AdController.store);
router.get('/:id/edit', AdController.edit);
router.put('/:id', AdController.update);
router.delete('/:id', AdController.delete);
router.get('/', AdController.index);

module.exports = router;