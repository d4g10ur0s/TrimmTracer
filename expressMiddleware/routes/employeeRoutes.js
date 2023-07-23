const express = require('express');
const router = express.Router();
const employeeShopController = require('../controllers/employeeShopController');

router.post('/getShopEmployees', employeeShopController.getShopEmployees);

module.exports = router;
