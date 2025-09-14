const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/step', profileController.saveStep);
router.get('/:uid', profileController.getProfile);

module.exports = router;
