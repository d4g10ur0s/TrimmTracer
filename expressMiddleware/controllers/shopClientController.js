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
  await client.execute(
    'Insert into trimmtracer.clients(shop_id,email,phone,name,note,sirname) VALUES (?,?,?,?,?,?)',
    [shop_id,email,phone,name,note,sirname]
  );
  res.status(201).json({ message: 'Client registered successfully' });
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
