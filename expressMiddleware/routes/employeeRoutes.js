const express = require('express');
const router = express.Router();
const employeeShopController = require('../controllers/employeeShopController');

router.post('/getShopEmployees', employeeShopController.getShopEmployees);
router.post('/deleteEmployee', employeeShopController.deleteShopEmployee);
router.post('/updateEmployee', employeeShopController.updateShopEmployee);

module.exports = router;
