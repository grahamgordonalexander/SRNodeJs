const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

// POST /api/customers - Create a new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    
    // Respond with a confirmation message
    res.status(201).json({
      message: 'Thank you! If a runner is available, you will receive an email.',
      customer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
