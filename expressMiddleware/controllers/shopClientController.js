const uuid = require('uuid');
const client = require('./db')
// add new client
exports.addClient = async (req, res) => {
  const { shop_id,name,sirname,email,phone,note } = req.body;
  console.log(req.body);
  await client.execute(
    'Insert into trimmtracer.clients(shop_id,email,phone,name,note,sirname) VALUES (?,?,?,?,?,?)',
    [shop_id,name,sirname,email,phone,note]
  );
  res.status(201).json({ message: 'User registered successfully' });
};
