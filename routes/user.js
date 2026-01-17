// routes/user.js
const express = require('express');
const { findUserById } = require('../models/user');
const auth = require('./middleware/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const user = await findUserById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    // возвращаем email и id (аватар — клиент сам подставит заглушку или URL)
    res.json({ id: user.id, email: user.email });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;