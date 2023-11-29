const uuid = require('uuid');
const client = require('./db');
const cassandra = require('cassandra-driver');

// date and time utils
function formatDateForJavaUtilDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based.
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function formatDuration(dur){
  var newDur;
  // Convert nanoseconds to milliseconds
  const totalMilliseconds = parseInt(dur.nanoseconds) / 1000000;
  // Calculate days, hours, minutes, and seconds
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
  const seconds = ((totalSeconds % 86400) % 3600) % 60;
  // Construct the Duration type
  newDur = new cassandra.types.Duration(0, hours, minutes, seconds, 0);
  return newDur;
}
// store appointments
exports.storeAppointments = async (req, res) => {
  const {appointments} = req.body;
  console.log(req.body);
  try {
    for(i in appointments){
      var tempDuration=formatDuration(appointments[i].dur);
      client.execute(
        'INSERT INTO trimmtracer.appointment (shop_id,when,employee_email,client_email,check_in,check_out,client_cost,client_fullname,client_phone,dur,employee_cost,employee_fullname,employee_phone,end_time,note,service_name,start_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [appointments[i].shop_id,
        appointments[i].when ,
        appointments[i].employee_email,
        appointments[i].client_email,
        appointments[i].check_in,
        appointments[i].check_out,
        appointments[i].client_cost,
        appointments[i].client_fullname,
        appointments[i].client_phone,
        tempDuration,
        appointments[i].employee_cost,
        appointments[i].employee_fullname,
        appointments[i].employee_phone,
        appointments[i].end_time,
        appointments[i].note ,
        appointments[i].service_name,
        appointments[i].start_time ,], { prepare: true }
      );
    }// store every service for appointment
    res.status(201).json({ message: 'Appointments stored successfully' });
  } catch (err) {
    console.error('Error during storing:', err);
    res.status(500).json({ error: 'Error during storing' });
  }
};
// get shop appointments
exports.getShopAppointments = async (req, res) => {
  const { shop_id,when_0,when_1 } = req.body;
  console.log(req.body);
  const shopAppointments = await client.execute(
    'SELECT * FROM trimmtracer.appointment WHERE shop_id=? AND when>=? AND when<=? ALLOW FILTERING',
    [shop_id, new Date(when_0), new Date(when_1)]
  );
  const appointments = shopAppointments.rows
  res.json({appointments});
};
// get number of appointments for a specific date for shop
exports.getShopNumberAppointments = async (req, res) => {
  const { shop_id,date} = req.body;
  console.log(req.body);
  const specificDate = new Date(date);
  const startTimestamp = specificDate.setHours(0, 0, 0, 0); // Set to start working hours of the day
  const endTimestamp = specificDate.setHours(23, 59, 59, 999); // Set to the last working hours of the day
  const numberOfAppointments = await client.execute(
    'select COUNT(*) from appointment where shop_id=? and when>=? and when<=? allow filtering;',
    [shop_id,new Date(startTimestamp),new Date(endTimestamp)]
  );
  console.log(numberOfAppointments.rows[0]);
  const appointmentLength = numberOfAppointments.rows[0]
  res.json({appointmentLength});
};
// get number of appointments for a specific date for employee
exports.getEmployeeNumberAppointments = async (req, res) => {
  const { shop_id,employee_email,date} = req.body;
  console.log(req.body);
  const specificDate = new Date(date);
  const startTimestamp = specificDate.setHours(0, 0, 0, 0); // Set to start working hours of the day
  const endTimestamp = specificDate.setHours(23, 59, 59, 999); // Set to the last working hours of the day
  const numberOfAppointments = await client.execute(
    'select COUNT(*) from appointment where shop_id=? and employee_email=? and when>=? and when<=? allow filtering;',
    [shop_id,employee_email,new Date(startTimestamp),new Date(endTimestamp)]
  );
  console.log(numberOfAppointments.rows[0]);
  const appointmentLength = numberOfAppointments.rows[0]
  res.json({appointmentLength});
};
// get appointments by employee
exports.getEmployeeAppointments = async (req, res) => {
  const { shop_id,employee_email,when_0,when_1 } = req.body;
  console.log(req.body);
  const shopAppointments = await client.execute(
    'select * from appointment where shop_id=? and when<=? and when>=? and employee_email=? ;',
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
// check for appointments
exports.checkForAppointments = async (req, res) => {
  const {shop_id,email} = req.body;
  console.log(req.body);
  try {
    for(i in appointments){
      var tempDuration=formatDuration(appointments[i].dur);
      const numberOfAppointments = client.execute(
        'select COUNT(*) from appointment where shop_id=? and email=? allow filtering;',
        [shop_id,email], { prepare: true }
      );
    }// store every service for appointment
    var hasAppointments = (numberOfAppointments.rows[0].count > 0);
    res.json({ hasAppointments });
  } catch (err) {
    console.error('Error during storing:', err);
    res.status(500).json({ error: 'Error during storing' });
  }
};
// check for appointments ( service version )
exports.checkForAppointmentsService = async (req, res) => {
  const {shop_id,email,service_name} = req.body;
  console.log(req.body);
  try {
    const specificDate = new Date();
    const startTimestamp = specificDate.setHours(0, 0, 0, 0); // Set to start working hours of the day
    const numberOfAppointments = await client.execute(
      'select COUNT(*) from appointment where shop_id=? and when<=? and employee_email=? and service_name=? allow filtering;',
      [shop_id,startTimestamp,email,service_name], { prepare: true }
    );
    console.log(numberOfAppointments.rows[0].count)
    var hasAppointments = (numberOfAppointments.rows[0].count > 0);
    res.json({ hasAppointments });
  } catch (err) {
    console.error('Error during storing:', err);
    res.status(500).json({ error: 'Error during storing' });
  }
};
