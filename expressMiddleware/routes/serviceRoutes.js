const express = require('express');
const router = express.Router();
const serviceShopController = require('../controllers/serviceShopController');

router.post('/getServices', serviceShopController.getShopServices);
router.post('/getServiceEmployees', serviceShopController.getServiceEmployees);
router.post('/addService', serviceShopController.addShopService);
router.post('/assignEmployees', serviceShopController.assignEmployees);
router.post('/deleteService', serviceShopController.deleteShopService);

module.exports = router;
