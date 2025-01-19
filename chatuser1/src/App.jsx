import React ,  { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import "./App.css"
import iamge from '../public/blank_profile.png'
import { IoSend } from "react-icons/io5";
const customId = "user" + Math.round(Math.random() * 10);
const socket = io('http://localhost:8000' ,{
  query: { customId }
}); // Connect to the Node.js server

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket.on('message', (data) => {
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
  
   <React.Fragment>
    <div className="split left">
      <div className="phone-screen">
        <div className="header">
           <div className='profile'>
            <div className='imageCircle'><img src={iamge} alt='profile'/></div>
            <div className='name'>John Doe</div>
           </div>
        </div>
        <div className="chat_wrapper">
        {
          chat.map((msg, index) => {
            if(msg.id === customId){
             return  (<div key={index} className="My_msg">
                   <div className='msg_wrap'>
                      <p className="msg-text">{msg.message}</p>
                      <span>{new Date().getTime}</span>
                      </div>
                 </div>)
            }else{
              return (<div key={index} className="Other_msg">
                   <div className='msg_wrap'>

                    <p className="msg-text">{msg.message}</p>
                    <span>{new Date().getTime}</span>
                    </div>
              </div>)
            }
          })
        }
        </div>
        <nav className="bottom-nav">
          {/* <div>
      {chat.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div> */}
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message..."
    />
    <button onClick={sendMessage}><span><IoSend color='#fff' size={22} /></span>    </button>

        </nav>
      </div>
    </div>
   
    </React.Fragment>
  
  )
}

export default App
