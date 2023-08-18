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
  const tEmployee = await client.execute(
    'select * from trimtracer.user WHERE email = ?',
    [email]
  );
  var tempEmployee=tEmployee.rows[0]
  console.log(tempEmployee)
  // Delete user
  await client.execute(
    'DELETE FROM trimtracer.user WHERE email = ?',// 8a allaksei se or phone
    [email]
  );
  // Insert the new user into the database
  await client.execute(
    'INSERT INTO trimtracer.user (email,phone,password,employee,shop_id,name,nickname,sirname,typeofemployee) VALUES (?,?,?,?,?,?,?,?,?)',
    [employee.email,employee.phone,tempEmployee.password,true,tempEmployee.shop_id,employee.name,employee.nickname,employee.sirname,employee.typeofemployee], { prepare: true }
  );
};
