const express = require('express');
const router = express.Router();
const appointmentShopController = require('../controllers/appointmentShopController');

router.post('/getShopAppointments', appointmentShopController.getShopAppointments);
//router.post('/getEmployeeAppointments', appointmentShopController.getEmployeeAppointments);

module.exports = router;