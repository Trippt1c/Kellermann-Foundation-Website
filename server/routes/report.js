const express = require('express');
const router = express.Router();
const userController = require('../controllers/reportController');

router.get('/', userController.report);
router.post('/', userController.reportGenerate);

router.get('/reportDefault', userController.reportDefault);

module.exports = router;