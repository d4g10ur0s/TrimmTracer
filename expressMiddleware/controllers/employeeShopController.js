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

exports.deleteShopEmployee = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  const shopEmployees = await client.execute(
    'DELETE FROM trimtracer.user WHERE email = ?',// 8a allaksei se or phone
    [email]
  );
  const employees = shopEmployees.rows
  res.json({employees});

};

exports.updateShopEmployee = async (req, res) => {
  const { email, employee } = req.body;
  console.log(req.body);
  const shopEmployees = await client.execute(
    'UPDATE trimtracer.user SET email=?,phone=?,name=?,nickname=?,sirname=?,typeofemployee=? WHERE email = ?',
    [employee.email,employee.phone,employee.name,employee.nickname,employee.sirname,employee.typeofemployee,email]
  );
};
