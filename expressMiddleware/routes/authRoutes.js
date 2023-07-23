const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/registerEmployee', authController.registerEmployee); // Add the new registration route

module.exports = router;
