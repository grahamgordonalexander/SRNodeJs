const express = require('express');
const Runner = require('../models/Runner');
const router = express.Router();

// POST /api/runners - Join as a new runner
router.post('/', async (req, res) => {
  try {
    const runner = new Runner(req.body);
    await runner.save();

    // Respond with a confirmation message
    res.status(201).json({
      message: 'Thank you for joining StayRunners!',
      runner,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
