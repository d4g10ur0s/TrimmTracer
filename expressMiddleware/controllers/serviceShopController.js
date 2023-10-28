const uuid = require('uuid');
const cassandra = require('cassandra-driver');
const client = require('./db');

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
// get shop services
exports.getShopServices = async (req, res) => {
  const { shop_id } = req.body;
  console.log(req.body);
  const shopServices = await client.execute(
    'SELECT * FROM trimmtracer.service WHERE shop_id = ?',
    [shop_id]
  );
  const services = shopServices.rows
  res.json({services});

};
// get service-employee relationship
exports.getServiceEmployees = async (req, res) => {
  const { shop_id,service_name } = req.body;
  console.log("aaa")
  console.log(req.body);

  const employeeEmails = await client.execute(
    'SELECT employee_email FROM trimmtracer.shopService WHERE shop_id=? and service_name=?',
    [shop_id,service_name]
  );
  const emails = employee_emails.rows.map(row => row.employee_email);
  res.json({emails});
};
// add service
exports.addShopService = async (req, res) => {
  const { shop_id , employee_email ,name , dur , client_cost , employee_cost ,description } = req.body;
  console.log(req.body)
  try {
    // Check if the service already exists in the database
    const serviceExists = await client.execute(
      'SELECT * FROM trimmtracer.service WHERE shop_id = ? and name = ?',
      [shop_id, name]
    );
    if (serviceExists.rows.length > 0) {
      return res.status(400).json({ error: 'Service already exists' });
    }
    // Insert the new service into the database
    const id = uuid.v4();
    const duration = cassandra.types.Duration.fromString(dur);
    // insert service
    await client.execute(
      'INSERT INTO trimmtracer.service (shop_id ,name , dur , average_dur, client_cost , employee_cost ,description,numberofemployees) VALUES (?,?,?,?,?,?,?,?)',
      [shop_id,name , duration , duration, client_cost , employee_cost ,description,1], { prepare: true }
    );
    // insert to relationship tables
    client.execute(
      'INSERT INTO trimmtracer.shopService (shop_id ,employee_email,service_name) VALUES (?,?,?)',
      [shop_id,employee_email,name], { prepare: true }
    );
    client.execute(
      'INSERT INTO trimmtracer.employeeService (shop_id ,employee_email,service_name) VALUES (?,?,?)',
      [shop_id,employee_email,name], { prepare: true }
    );

    res.status(201).json({ message: 'Service stored successfully' });
  } catch (err) {
    console.error('Error during storing:', err);
    res.status(500).json({ error: 'Error during storing' });
  }
};
// assign service
exports.assignService = async (req, res) => {
  const { shop_id , id , employee_email ,name , dur , average_dur, client_cost , employee_cost ,description } = req.body;
  try {
    // Check if the service already exists in the database
    console.log("delete")
    await client.execute(
      'DELETE FROM trimmtracer.service WHERE shop_id = ? and id = ?',
      [shop_id, id]
    );
    // Insert the new service into the database
    const newId = uuid.v4();
    var newDur = formatDuration(dur);
    var newAvgDur = formatDuration(average_dur);
    console.log(employee_email)
    client.execute(
      'INSERT INTO trimmtracer.service (id, shop_id , employee_email ,name , dur , average_dur, client_cost , employee_cost ,description) VALUES (?,?,?,?,?,?,?,?,?)',
      [newId, shop_id , employee_email[0] ,name , newDur , newAvgDur, client_cost , employee_cost ,description], { prepare: true }
    );

    res.status(201).json({ message: 'Service stored successfully' });
  } catch (err) {
    console.error('Error during storing:', err);
    res.status(500).json({ error: 'Error during storing' });
  }
};
// delete service
exports.deleteShopService = async (req, res) => {
  const { shop_id,name } = req.body;
  console.log(req.body);
  const shopServices = await client.execute(
    'DELETE FROM trimmtracer.service WHERE shop_id=? and name=?',
    [shop_id,name]
  );
  // get emails
  const employee_emails = await client.execute(
    'SELECT employee_email FROM trimmtracer.shopService WHERE shop_id=? and service_name=?',
    [shop_id, name]
  );
  const emails = employee_emails.rows.map(row => row.employee_email);
  // delete relationship rows from tables shopService and employeeService
  client.execute(
    'DELETE FROM trimmtracer.shopService WHERE shop_id=? and service_name=?',// 8a allaksei se or phone
    [shop_id,name]
  );
  client.execute(
    'DELETE FROM trimmtracer.employeeService WHERE shop_id=? and employee_email IN ? and service_name=?',
    [shop_id,emails,name]
  );

  res.json({message: 'Data deleted successfully'});
};
