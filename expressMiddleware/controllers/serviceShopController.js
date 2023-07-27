const uuid = require('uuid');
const client = require('./db')

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
