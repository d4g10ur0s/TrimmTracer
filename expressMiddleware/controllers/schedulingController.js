const uuid = require('uuid');
const client = require('./db')
const { spawn } = require('child_process');

// get shop appointments
exports.getAppointmentTimesForDate = async (req, res) => {
  const { shop_id, employee_email ,workingHours,date,duration } = req.body;
  console.log(req.body);
  var ndate = new Date(date)
  // set up start and end time of day
  const startTimestamp = ndate.setHours(0, 0, 0, 0); // Set to start working hours of the day
  const endTimestamp = ndate.setHours(23, 59, 59, 999); // Set to the last working hours of the day
  // get appointments for day
  const shopAppointments = await client.execute(
    'SELECT * FROM trimmtracer.appointment WHERE shop_id=? and employee_email=? AND when>=? AND when<=? ALLOW FILTERING',
    [shop_id, employee_email,startTimestamp, endTimestamp]
  );
  // call python script
  const pythonScript = spawn('python', ['..\\appointmentScheduling\\schedulingScriptMain.py',
                              JSON.stringify({
                                requestBody : req.body ,
                                shopAppointments : shopAppointments.rows,
                              })]);
  //send feedback
  pythonScript.stdout.on('data', (data) => {
   console.log(`Python script output: ${data}`);
   res.send({ message: 'Appointment scheduled successfully' });
 });
 //send feedback
 pythonScript.stderr.on('data', (data) => {
   console.error(`Error from Python script: ${data}`);
   res.status(500).send({ error: 'Internal Server Error' });
 });

};
