const uuid = require('uuid');
const cassandra = require('cassandra-driver');
const client = require('./db');

exports.getShopServices = async (req, res) => {
  const { shop_id } = req.body;
  console.log(req.body);
  const shopServices = await client.execute(
    'SELECT * FROM trimtracer.service WHERE shop_id = ?',// 8a allaksei se or phone
    [shop_id]
  );
  const services = shopServices.rows
  res.json({services});

};
// delete service
exports.deleteShopService = async (req, res) => {
  const { shop_id , id } = req.body;
  console.log(req.body);
  const shopEmployees = await client.execute(
    'DELETE FROM trimtracer.service WHERE shop_id = ? and id = ?',
    [shop_id , id]
  );
  const employees = shopEmployees.rows
  res.json({employees});
};
// add service
exports.addShopService = async (req, res) => {
  const { shop_id , employee_email ,name , dur , client_cost , employee_cost ,description } = req.body;
  console.log(req.body)
  try {
    // Check if the service already exists in the database
    const serviceExists = await client.execute(
      'SELECT * FROM trimtracer.service WHERE shop_id = ? and name = ? ALLOW FILTERING',
      [shop_id, name]
    );
    if (serviceExists.rows.length > 0) {
      return res.status(400).json({ error: 'Service already exists' });
    }
    // Insert the new service into the database
    const id = uuid.v4();
    const duration = cassandra.types.Duration.fromString(dur);
    console.log(duration);
    await client.execute(
      'INSERT INTO trimtracer.service (id, shop_id , employee_email ,name , dur , average_dur, client_cost , employee_cost ,description) VALUES (?,?,?,?,?,?,?,?,?)',
      [id, shop_id , employee_email ,name , duration , duration, client_cost , employee_cost ,description], { prepare: true }
    );

    res.status(201).json({ message: 'Service stored successfully' });
  } catch (err) {
    console.error('Error during storing:', err);
    res.status(500).json({ error: 'Error during storing' });
  }
};
