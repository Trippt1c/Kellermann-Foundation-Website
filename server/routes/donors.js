const express = require('express');
const router = express.Router();
const userController = require('../controllers/donorController');

// Routes
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adddonor', userController.form);
router.post('/adddonor', userController.create);
router.get('/editdonor/:id', userController.edit);
router.post('/editdonor/:id', userController.update);
router.get('/viewdonor/:id', userController.viewall);
router.get('/:id',userController.delete);
  
module.exports = router;