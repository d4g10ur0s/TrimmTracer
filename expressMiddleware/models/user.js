// Replace this with your actual user model using an ORM like Mongoose
// In this example, we're just using an object for simplicity.
const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
  // Add more users as needed
];

module.exports = {
  findByUsernameAndPassword: (username, password) => {
    return users.find((user) => user.username === username && user.password === password);
  },
};
