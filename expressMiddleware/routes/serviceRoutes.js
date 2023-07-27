const express = require('express');
const router = express.Router();
const serviceShopController = require('../controllers/serviceShopController');

router.post('/getServices', serviceShopController.getShopServices);

module.exports = router;
