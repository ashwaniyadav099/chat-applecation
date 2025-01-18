import  { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000'); // Connect to the Node.js server

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (data) => {
      console.log(data)
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit('message', message); // Send a message to the server
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
    <h1>Socket.IO Chat</h1>
    <div>
      {chat.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message..."
    />
    <button onClick={sendMessage}>Send</button>
  </div>
  )
}

export default App
