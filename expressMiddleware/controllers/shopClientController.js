const uuid = require('uuid');
const client = require('./db')
// update appointments
const updateAppointments = async (shop_id,email,phone,name,note,sirname,oldEmail) => {
  try {
    const clientAppointments = await client.execute(
      'select * from trimmtracer.appointment where shop_id=? and client_email=? ALLOW FILTERING',
      [shop_id,oldEmail]
    );
    for(i in clientAppointments.rows){
      client.execute(
        'delete from trimmtracer.appointment where shop_id=? and when=? and employee_email=? and client_email=?',
        [shop_id,clientAppointments.rows[i].when,clientAppointments.rows[i].employee_email,oldEmail]
      );
      client.execute(
        'INSERT INTO trimmtracer.appointment (shop_id,when,employee_email,client_email,check_in,check_out,client_cost,client_fullname,client_phone,dur,employee_cost,employee_fullname,employee_phone,end_time,note,service_name,start_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [shop_id,
        clientAppointments.rows[i].when ,
        clientAppointments.rows[i].employee_email,
        email,
        clientAppointments.rows[i].check_in,
        clientAppointments.rows[i].check_out,
        clientAppointments.rows[i].client_cost,
        name + ' ' + sirname,
        phone,
        clientAppointments.rows[i].dur,
        clientAppointments.rows[i].employee_cost,
        clientAppointments.rows[i].employee_fullname,
        clientAppointments.rows[i].employee_phone,
        clientAppointments.rows[i].end_time,
        clientAppointments.rows[i].note ,
        clientAppointments.rows[i].service_name,
        clientAppointments.rows[i].start_time ,], { prepare: true }
      );
    }// update appointment information
  }catch(error){
    console.log(error)
  }
}
// get shop's clients
exports.getClients = async (req, res) => {
  const { shop_id } = req.body;
  console.log(req.body);
  const shopClients = await client.execute(
    'select * from trimmtracer.clients where shop_id = ? ALLOW FILTERING',
    [shop_id]
  );
  const clients = shopClients.rows;
  res.json({clients});
};
// add new client
exports.addClient = async (req, res) => {
  const { shop_id,email,phone,name,note,sirname } = req.body;
  console.log(req.body);
  // check if client exists
  try {
    // Check if the username already exists in the database
    const userExists = await client.execute(
      'SELECT * FROM trimmtracer.clients WHERE shop_id=? and email=?',
      [shop_id,email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Client already exists' });
    }
    // Insert the new client into the database
    await client.execute(
      'Insert into trimmtracer.clients(shop_id,email,phone,name,note,sirname) VALUES (?,?,?,?,?,?)',
      [shop_id,email,phone,name,note,sirname]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Error during registration' });
  }
};
// delete client
exports.deleteClient = async (req, res) => {
  const { shop_id,clientEmail} = req.body;
  console.log(req.body);
  await client.execute(
    'delete from trimmtracer.clients where shop_id=? and email=?',
    [shop_id,clientEmail]
  );
  // what to do with the appointments ?
  res.status(201).json({ message: 'Client deleted successfully' });
};
// update modified client
exports.updateClient = async (req, res) => {
  const { shop_id,email,phone,name,note,sirname,oldEmail } = req.body;
  console.log(oldEmail)
  console.log(req.body);
  // check if client exists
  try {
    updateAppointments(shop_id,email,phone,name,note,sirname,oldEmail)
    // just update client
    await client.execute(
      'Insert into trimmtracer.clients(shop_id,email,phone,name,note,sirname) VALUES (?,?,?,?,?,?)',
      [shop_id,email,phone,name,note,sirname]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Error during registration' });
  }
};
