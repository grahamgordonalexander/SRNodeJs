const express = require('express');
const Order = require('../models/Order');
const { sendEmailToRunners } = require('../utils/email');
const router = express.Router();

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  try {
    const { customerId, item, city } = req.body;

    const order = new Order({
      customer: customerId,
      item,
      status: 'Pending',
    });

    await order.save();

    // Send email notifications to active runners in the specified city
    const activeRunners = await Runner.find({ city, isActive: true });
    await sendEmailToRunners(activeRunners, 'New Order Request', `A customer in ${city} wants ${item}. Click to accept the order.`);

    res.status(201).json({
      message: 'Order created successfully. You will receive an email if a runner accepts.',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/orders/confirm - Confirm order with runner acceptance
router.put('/confirm', async (req, res) => {
  try {
    const { orderId, runnerId, agreedPrice, eta, role } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order with runner details and confirmation
    order.agreedPrice = agreedPrice;
    order.eta = eta;

    if (role === 'customer') {
      order.customerConfirmed = true; // Confirmation from the customer
    } else if (role === 'runner') {
      order.runnerConfirmed = true; // Confirmation from the runner
    }

    if (order.customerConfirmed && order.runnerConfirmed && order.agreedPrice === agreedPrice) {
      order.status = 'Agreed'; // Both parties have agreed on the price
    }

    await order.save(); // Save the updated order

    res.status(200).json({
      message: 'Order updated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
