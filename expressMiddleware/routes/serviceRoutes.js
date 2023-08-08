const express = require('express');
const router = express.Router();
const serviceShopController = require('../controllers/serviceShopController');

router.post('/getServices', serviceShopController.getShopServices);
router.post('/addService', serviceShopController.addShopService);
router.post('/assignService', serviceShopController.assignService);
router.post('/deleteService', serviceShopController.deleteShopService);

module.exports = router;
