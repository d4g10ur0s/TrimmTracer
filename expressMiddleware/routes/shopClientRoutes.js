const express = require('express');
const router = express.Router();
const shopClientController = require('../controllers/shopClientController');

router.post('/getShopClients', shopClientController.getClients);
router.post('/addClient', shopClientController.addClient);
router.post('/deleteClient', shopClientController.deleteClient);

module.exports = router;
