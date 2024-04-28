const Order = require('../models/Order');

// Function to create a new order
const createOrder = async (req, res) => {
  try {
    const { customerId, item, city } = req.body;

    // Create a new order
    const order = new Order({
      customer: customerId,
      item,
      status: 'Pending', // Default status
    });

    await order.save(); // Save to the database

    res.status(201).json({
      message: 'Order created successfully.',
      order,
    });

    // Additional logic to notify runners (not fully implemented here)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to confirm an order
const confirmOrder = async (req, res) => {
  try {
    const { orderId, agreedPrice, eta } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order with the agreed price and ETA
    order.agreedPrice = agreedPrice;
    order.eta = eta;
    order.status = 'Accepted'; // Order is now accepted

    await order.save(); // Save the updated order to the database

    res.status(200).json({
      message: 'Order confirmed',
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, confirmOrder };
