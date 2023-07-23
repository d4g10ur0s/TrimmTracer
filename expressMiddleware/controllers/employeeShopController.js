const uuid = require('uuid');
const client = require('./db')

exports.getShopEmployees = async (req, res) => {
  const { shop_id } = req.body;
  console.log(req.body);
  const shopEmployees = await client.execute(
    'SELECT * FROM trimtracer.user WHERE shop_id = ?',// 8a allaksei se or phone
    [shop_id]
  );
  const employees = shopEmployees.rows
  res.json({employees});

};
