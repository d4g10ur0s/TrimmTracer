const { v4: uuidv4, parse: parseUUID } = require('uuid');
const client = require('./db')

exports.registerEmployee = async (req, res) => {
  const { name,sirname,email,phone,typeofemployee,password,shop_id } = req.body;
  console.log(shop_id)
  try {
    // Check if the username already exists in the database
    const userExists = await client.execute(
      'SELECT * FROM trimmtracer.user WHERE employee=? and email = ?',
      [true,email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    // Insert the new user into the database
    await client.execute(
      'INSERT INTO trimmtracer.user (email,phone,password,employee,shop_id,name,sirname,typeofemployee) VALUES (?,?,?,?,?,?,?,?)',
      [email,phone,password,true,shop_id,name,sirname,typeofemployee], { prepare: true }
    );
    await client.execute(
      'INSERT INTO trimmtracer.employee (email,phone,shop_id,name,sirname,typeofemployee) VALUES (?,?,?,?,?,?)',
      [email,phone,shop_id,name,sirname,typeofemployee], { prepare: true }
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Error during registration' });
  }
};

exports.login = async (req, res) => {
  const { email,password,employee } = req.body;
  console.log(req.body);
  const userExists = await client.execute(
    'SELECT * FROM trimmtracer.user WHERE employee=? and email = ?',// 8a allaksei se or phone
    [employee,email]
  );
  // check if user exist
  if (userExists.rows.length > 0) {
    // if credentials are valid
    if(userExists.rows[0].password === password){
      return res.json({ user : userExists.rows[0]});
    }
    return res.status(401).json({ error : "Wrong Password"});
  } else {
    // user doesn't exist
    res.status(401).json({ error: 'There is no employee with these credentials ' });
  }
};
