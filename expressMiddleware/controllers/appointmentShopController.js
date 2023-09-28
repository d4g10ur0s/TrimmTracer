const uuid = require('uuid');
const client = require('./db')

function formatDateForJavaUtilDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based.
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

exports.getShopAppointments = async (req, res) => {
  const { shop_id,employee_email,when_0,when_1 } = req.body;
  console.log(req.body);
  const shopAppointments = await client.execute(
    'SELECT * FROM trimtracer.appointment WHERE shop_id=? AND when>=? AND when<=? ALLOW FILTERING',
    [shop_id, new Date(when_0), new Date(when_1)]
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
