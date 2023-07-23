const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/shop', employeeRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
