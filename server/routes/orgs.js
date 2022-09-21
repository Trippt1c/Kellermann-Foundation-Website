const express = require('express');
const router = express.Router();
const userController = require('../controllers/orgController');
const grantController = require('../controllers/grantsController');

// Routes
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/addorg', userController.form);
router.post('/addorg', userController.create);
router.get('/vieworg/:id', userController.viewall);
router.get('/edit-org/:id', userController.edit);
router.post('/edit-org/:id', userController.update);

router.get('/addgrant', grantController.form);
router.post('/addgrant', grantController.create);
router.get('/vieworg/:org_id/editgrant/:id', grantController.edit);
router.post('/vieworg/:org_id/editgrant/:id', grantController.update);

// router.get('/viewgrant/:id', userController.viewall);
// router.get('/:id',userController.delete);
  
module.exports = router;