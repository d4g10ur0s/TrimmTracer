const uuid = require('uuid');
const client = require('./db')
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
  res.status(201).json({ message: 'Client deleted successfully' });
};
