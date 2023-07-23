const { v4: uuidv4, parse: parseUUID } = require('uuid');
const client = require('./db')

exports.registerEmployee = async (req, res) => {
  const { name,sirname,nickname,email,phone,typeofemployee,password,shop_id } = req.body;
  console.log(shop_id)
  try {
    // Check if the username already exists in the database
    const userExists = await client.execute(
      'SELECT * FROM trimtracer.user WHERE email = ?',
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    // Insert the new user into the database
    await client.execute(
      'INSERT INTO trimtracer.user (email,phone,password,employee,shop_id,name,nickname,sirname,typeofemployee) VALUES (?,?,?,?,?,?,?,?,?)',
      [email,phone,password,true,shop_id,name,nickname,sirname,typeofemployee], { prepare: true }
    );
    console.log(shop_id)

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Error during registration' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const userExists = await client.execute(
    'SELECT * FROM trimtracer.user WHERE email = ?',// 8a allaksei se or phone
    [email]
  );
  if (userExists.rows.length > 0) {
    if(userExists.rows[0].password === password){
      return res.json({ user : userExists.rows[0]});
    }
    return res.json({ error : "Wrong Password"});
  }
  if (user) {
    res.json({ message: `Welcome, ${username}!` });
  } else {
    res.status(401).json({ error: 'Invalid credentials. Please try again.' });
  }
};
