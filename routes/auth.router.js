const express = require('express');
const authService = require('../services/auth.service');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await authService.register(email, password);
    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define other routes as needed

module.exports = router;
