const uuid = require('uuid');
const client = require('./db')

function formatDateForJavaUtilDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based.
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
// get shop appointments
exports.getShopAppointments = async (req, res) => {
  const { shop_id,employee_email,when_0,when_1 } = req.body;
  console.log(req.body);
  const shopAppointments = await client.execute(
    'SELECT * FROM trimtracer.appointment WHERE shop_id=? AND when>=? AND when<=? ALLOW FILTERING',
    [shop_id, new Date(when_0), new Date(when_1)]
  );
  const appointments = shopAppointments.rows
  res.json({appointments});
};
// get number of appointments for a specific date
exports.getEmployeeNumberAppointments = async (req, res) => {
  const { shop_id,employee_email,date} = req.body;
  console.log(req.body);
  const specificDate = new Date(date);
  const startTimestamp = specificDate.setHours(0, 0, 0, 0); // Set to start working hours of the day
  const endTimestamp = specificDate.setHours(23, 59, 59, 999); // Set to the last working hours of the day
  const numberOfAppointments = await client.execute(
    'select COUNT(*) from appointment where shop_id=? and employee_email=? and when<=? and when>=? allow filtering;',
    [shop_id,employee_email,startTimestamp,endTimestamp]
  );
  const appointmentLength = numberOfAppointments.rows[0]
  res.json({appointmentLength});
};
// get appointments by employee
exports.getEmployeeAppointments = async (req, res) => {
  const { shop_id,employee_email,when_0,when_1 } = req.body;
  console.log(req.body);
  const shopAppointments = await client.execute(
    'select * from appointment where shop_id=? and employee_email=? and (when<=? and when>=?);',
    [shop_id,employee_email,when_0,when_1]
  );
  const appointments = shopAppointments.rows
  res.json({appointments});
};
// get appointment times for appointment creation
exports.getAppointmentTimesForDate = async (req, res) => {
  const { shop_id,employee_email,date } = req.body;
  console.log(req.body);
  const specificDate = new Date(date);
  const startTimestamp = specificDate.setHours(0, 0, 0, 0); // Set to start working hours of the day
  const endTimestamp = specificDate.setHours(23, 59, 59, 999); // Set to the last working hours of the day

  const shopAppointments = await client.execute(
    'select * from appointment where shop_id=? and when<=? and when>=? and employee_email=? ALLOW FILTERING;',
    [shop_id,startTimestamp,endTimestamp,employee_email]
  );
  const appointments = shopAppointments.rows
  res.json({appointments});
};
