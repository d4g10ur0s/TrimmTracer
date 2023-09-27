const uuid = require('uuid');
const client = require('./db')

exports.getShopAppointments = async (req, res) => {
  const { shop_id,when_0,when_1 } = req.body;
  console.log(req.body);
  const shopAppointments = await client.execute(
    'select * from appointment where shop_id = ? and (when<=? and when>=?)',// 8a allaksei se or phone
    [shop_id,when_0,when_1]
  );
  const appointments = shopAppointments.rows
  res.json({appointments});
};

exports.getEmployeeAppointments = async (req, res) => {
  const { shop_id,employee_email,when_0,when_1 } = req.body;
  console.log(req.body);
  const shopAppointments = await client.execute(
    'select * from appointment where shop_id=? and employee_email=? and (when<=? and when>=?);',
    [shop_id,employee_email,when_0,when_1]
  );
  const appointments = shopAppointments.rows
  res.json({appointments});
};
