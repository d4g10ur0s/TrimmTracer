const uuid = require('uuid');
const client = require('./db')

// Sample user data (replace with your actual database schema)
const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
  // Add more users as needed
];

exports.registerEmployee = async (req, res) => {
  const { username, password , email ,employee ,shop_id , name, nickname , sirname , typeofemployee } = req.body;

  try {
    // Check if the username already exists in the database
    const userExists = await client.execute(
      'SELECT * FROM trimtracer.user WHERE email = ? and phone = ?',
      [email,phone]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Generate a unique ID for the new user
    const newUserId = uuid.v4();

    // Insert the new user into the database
    await client.execute(
      'INSERT INTO trimtracer.user (id, password , email ,employee ,shop_id , name, nickname , sirname , typeofemployee) VALUES (?, ?, ? , ? , ? ,? , ? ,? ,?)',
      [newUserId, password , email ,employee ,shop_id , name, nickname , sirname , typeofemployee]
    );

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
