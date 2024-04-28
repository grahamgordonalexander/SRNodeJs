import React, { useState } from 'react';
import axios from 'axios';

function RunnerJoin() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const joinAsRunner = async () => {
    try {
      const response = await axios.post('/api/runner/join', { email, city });
      if (response.status === 200) {
        console.log('Joined as runner successfully');
        // Redirect to thank-you page or display success message
      }
    } catch (error) {
      console.error('Error joining as runner:', error);
    }
  };

  return (
    <div>
      <h2>Join as Runner</h2>
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
      <button onClick={joinAsRunner}>Join</button>
    </div>
  );
}

export default RunnerJoin;
