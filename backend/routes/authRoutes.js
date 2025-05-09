const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin credentials (in a real app, these would be in a database)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'abeer000';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin@abeer111';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create token
      const token = jwt.sign(
        { username: ADMIN_USERNAME },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        token,
        username: ADMIN_USERNAME
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 