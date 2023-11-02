const uuid = require('uuid');
const client = require('./db')

exports.getShopEmployees = async (req, res) => {
  const { shop_id } = req.body;
  console.log(req.body);
  const shopEmployees = await client.execute(
    'SELECT * FROM trimmtracer.employee WHERE shop_id = ?',// 8a allaksei se or phone
    [shop_id]
  );
  const employees = shopEmployees.rows
  res.json({employees});

};
// get service-employee relationship
exports.getEmployeeServices = async (req, res) => {
  const { shop_id,employee_email } = req.body;
  console.log(req.body);

  const serviceNames = await client.execute(
    'SELECT service_name FROM trimmtracer.employeeService WHERE shop_id=? and employee_email=?',
    [shop_id,employee_email]
  );
  const names = serviceNames.rows.map(row => row.service_name);
  res.json({names});
};
// assign service
exports.assignServices = async (req, res) => {
  const { shop_id , assign_name, unassign_name ,email} = req.body;
  var counter=0;
  if(assign_name.length>unassign_name.length){counter=assign_name.length}
  else{counter=unassign_name.length}
  try {
    for(let i=0; i<counter; i++){
      // assign by emails
      if(i<assign_name.length){//prepei na ginoun bulk
        client.execute(
          'INSERT INTO trimmtracer.shopService (shop_id , employee_email ,service_name) VALUES (?,?,?)',
          [shop_id , email ,assign_name[i]], { prepare: true }
        );
        client.execute(
          'INSERT INTO trimmtracer.employeeService (shop_id , employee_email ,service_name) VALUES (?,?,?)',
          [shop_id , email,assign_name[i]], { prepare: true }
        );
        const service = await client.execute(
          'select * from trimmtracer.service where shop_id = ? and name=?',
          [shop_id ,assign_name[i]], { prepare: true }
        );
        // update service
        client.execute(
          'INSERT INTO trimmtracer.service (shop_id ,name , dur , average_dur, client_cost , employee_cost ,description,numberofemployees) VALUES (?,?,?,?,?,?,?,?)',
          [service.rows[0].shop_id,
          service.rows[0].name , service.rows[0].dur , service.rows[0].average_dur,
          service.rows[0].client_cost , service.rows[0].employee_cost ,service.rows[0].description,
          service.rows[0].numberofemployees+1], { prepare: true }
        );
      }
      // unassign by emails
      if(i<unassign_name.length){// mporei na ginei me ena statement , xwris loops ?
        client.execute(
          'DELETE FROM trimmtracer.shopService where shop_id=? and service_name=? and employee_email=?',
          [shop_id ,unassign_name[i],email], { prepare: true }
        );
        client.execute(
          'DELETE FROM trimmtracer.employeeService where shop_id=? and employee_email=? and service_name=?',
          [shop_id , email,unassign_name[i]], { prepare: true }
        );
        // update service
        const uservice = await client.execute(
          'select * from trimmtracer.service where shop_id = ? and name=?',
          [shop_id ,unassign_name[i]], { prepare: true }
        );
        client.execute(
          'INSERT INTO trimmtracer.service (shop_id ,name , dur , average_dur, client_cost , employee_cost ,description,numberofemployees) VALUES (?,?,?,?,?,?,?,?)',
          [uservice.rows[0].shop_id,
          uservice.rows[0].name , uservice.rows[0].dur , uservice.rows[0].average_dur,
          uservice.rows[0].client_cost , uservice.rows[0].employee_cost ,uservice.rows[0].description,
          uservice.rows[0].numberofemployees-1], { prepare: true }
        );
      }
    }//endFor
    res.status(201).json({ message: 'Service stored successfully' });
  } catch (err) {
    console.error('Error during storing:', err);
    res.status(500).json({ error: 'Error during storing' });
  }
};
// delete an employee
exports.deleteShopEmployee = async (req, res) => {
  const { shop_id,email } = req.body;
  console.log(req.body);
  const shopEmployees = await client.execute(
    'DELETE FROM trimmtracer.user WHERE employee=? and email = ?',// 8a allaksei se or phone
    [true,email]
  );
  client.execute(
    'DELETE FROM trimmtracer.employee WHERE shop_id=? and email = ?',// 8a allaksei se or phone
    [shop_id,email]
  );
  const employees = shopEmployees.rows
  res.json({employees});
};
// update employee
exports.updateShopEmployee = async (req, res) => {
  const { email, employee } = req.body;
  console.log(req.body);
  const passw = await client.execute(
    'select password from trimmtracer.user WHERE employee=? and email = ?',
    [true,email]
  );
  // Insert the new user into the database
  await client.execute(
    'INSERT INTO trimmtracer.user (email,phone,password,employee,shop_id,name,sirname,typeofemployee) VALUES (?,?,?,?,?,?,?,?)',
    [employee.email,employee.phone,passw.rows[0].password,true,employee.shop_id,employee.name,employee.sirname,employee.typeofemployee], { prepare: true }
  );
};
