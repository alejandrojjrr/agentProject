const express = require('express');
const router = express.Router();

// Routes will be added here
router.get('/', (req, res) => {
  res.json({ message: 'Agents endpoint' });
});

module.exports = router; 