import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function CustomerOrder() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [orderDetails, setOrderDetails] = useState('');
  const history = useHistory();

  const placeOrder = async () => {
    try {
      const response = await axios.post('/api/order/place', {
        email,
        city,
        orderDetails,
      });
      if (response.status === 200) {
        console.log('Order placed successfully');
        history.push('/thank-you'); // Redirect to the thank-you page
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Order Details"
        value={orderDetails}
        onChange={(e) => setOrderDetails(e.target.value)}
      />
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default CustomerOrder;
