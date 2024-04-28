const express = require('express');
const customerRoutes = require('./customerRoutes');
const runnerRoutes = require('./runnerRoutes');
const orderRoutes = require('./orderRoutes');

const router = express.Router();

// Setup routes for customers, runners, and orders
router.use('/customers', customerRoutes);
router.use('/runners', runnerRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
