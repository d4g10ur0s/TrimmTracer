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
  const emails = employeeEmails.rows.map(row => row.employee_email);
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
  const { shop_id , assign_email, unassign_email ,name} = req.body;
  var counter=0;
  if(assign_email.length>unassign_email.length){counter=assign_email.length}
  else{counter=unassign_email.length}
  try {
    for(let i=0; i<counter; i++){
      // assign by emails
      if(i<assign_email.length){//prepei na ginoun bulk
        client.execute(
          'INSERT INTO trimmtracer.shopService (shop_id , employee_email ,service_name) VALUES (?,?,?)',
          [shop_id , assign_email[i] ,name], { prepare: true }
        );
        client.execute(
          'INSERT INTO trimmtracer.employeeService (shop_id , employee_email ,service_name) VALUES (?,?,?)',
          [shop_id , assign_email[i] ,name], { prepare: true }
        );
      }
      // unassign by emails
      if(i<unassign_email.length){// mporei na ginei me ena statement , xwris loops ?
        client.execute(
          'DELETE FROM trimmtracer.shopService where shop_id=? and service_name=? and employee_email=?',
          [shop_id ,name, unassign_email[i]], { prepare: true }
        );
        client.execute(
          'DELETE FROM trimmtracer.employeeService where shop_id=? and employee_email=? and service_name=?',
          [shop_id , unassign_email[i] ,name], { prepare: true }
        );
      }
    }//endFor
    // u have to update
    const service = await client.execute(
      'select * from trimmtracer.service where shop_id = ? and name=?',
      [shop_id ,name], { prepare: true }
    );
    await client.execute(
      'INSERT INTO trimmtracer.service (shop_id ,name , dur , average_dur, client_cost , employee_cost ,description,numberofemployees) VALUES (?,?,?,?,?,?,?,?)',
      [service.rows[0].shop_id,
      service.rows[0].name , service.rows[0].dur , service.rows[0].average_dur,
      service.rows[0].client_cost , service.rows[0].employee_cost ,service.rows[0].description,
      assign_email.length], { prepare: true }
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
