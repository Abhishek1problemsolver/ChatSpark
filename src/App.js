import React, { useState } from 'react';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';

const getBotReply = async (userMessage) => {
  const options = {
    method: 'POST',
    url: 'https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '3fd43517d3msh06447b5f467a71ap15c516jsn03eafe1057d0',
      'X-RapidAPI-Host': 'chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com',
    },
    data: {
      model: 'gpt-3.5-turbo',
      messages: [userMessage],
      temperature: 0.8,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return 'Oops! An error occurred.';
  }
};

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const userMessage = {
      role: 'user',
      content: inputValue,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const botReply = await getBotReply(userMessage);

    const botMessage = {
      role: 'bot',
      content: botReply,
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <div className="header">Chatspark</div>
      <div className="message-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user' : 'bot'}`}
          >
            {message.role === 'user' && <PersonIcon className="icon user-icon" />}
            {message.role === 'bot' && <MessageIcon className="icon bot-icon" />}
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <MessageIcon className="icon bot-icon" />
            <div className="loading-icon">
              <CircularProgress size={34} />
            </div>
          </div>
        )}
      </div>
      <form className="input-container" onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">
          <SendIcon className="sending" />
        </button>
      </form>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Developed by Abhishek DN
      </footer>
    </div>
  );
}

export default App;
