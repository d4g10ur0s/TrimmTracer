const express = require('express');
const router = express.Router();
const appointmentShopController = require('../controllers/appointmentShopController');
const appointmentSchedulingController = require('../controllers/schedulingController');

// appointment storing
router.post('/storeAppointments', appointmentShopController.storeAppointments);
// appointment getter
router.post('/getShopAppointments', appointmentShopController.getShopAppointments);
router.post('/getShopNumberAppointments', appointmentShopController.getShopNumberAppointments);
router.post('/getEmployeeNumberAppointments', appointmentShopController.getEmployeeNumberAppointments);
router.post('/getEmployeeAppointments', appointmentShopController.getEmployeeAppointments);
router.post('/checkForAppointments', appointmentShopController.checkForAppointments);
router.post('/checkForAppointmentsService', appointmentShopController.checkForAppointmentsService);
router.post('/getAppointmentTimesForDate', appointmentSchedulingController.getAppointmentTimesForDate);

module.exports = router;
