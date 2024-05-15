const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET_KEY = 'your_secret_key';

async function login(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY);
  return token;
}

async function register(email, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  await User.create({ email, password: hashedPassword });
}

// Other service functions like addUser, deleteUser, etc.

module.exports = {
  login,
  register
  // Add other service functions here
};
