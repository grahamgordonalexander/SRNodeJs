import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Adjust as needed

function RunnerChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { text: message };

      // Send the message to the server
      socket.emit('send_message', newMessage);

      // Clear the input field
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat with Runner</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <span>{msg.timestamp.toLocaleString()}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default RunnerChat;
