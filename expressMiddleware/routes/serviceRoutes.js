const express = require('express');
const router = express.Router();
const serviceShopController = require('../controllers/serviceShopController');

router.post('/getShopServices', serviceShopController.getShopServices);

module.exports = router;
