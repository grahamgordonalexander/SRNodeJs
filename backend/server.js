const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
dotenv.config(); // Load environment variables
var cors = require('cors')
const app = express();
const port = process.env.PORT || 3000; // Default to port 3000

// Middleware to parse JSON
app.use(express.json());
app.use(cors())
// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Set up routes
app.use('/api', routes);

// Default route to check server status
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
