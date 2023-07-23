const express = require('express');
const router = express.Router();
const employeeShopController = require('../controllers/employeeShopController');

router.post('/getShopEmployees', employeeShopController.getShopEmployees);
router.post('/deleteEmployee', employeeShopController.deleteShopEmployee);

module.exports = router;
