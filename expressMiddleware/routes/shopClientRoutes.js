const express = require('express');
const router = express.Router();
const shopClientController = require('../controllers/shopClientController');

router.post('/addClient', shopClientController.addClient);

module.exports = router;
