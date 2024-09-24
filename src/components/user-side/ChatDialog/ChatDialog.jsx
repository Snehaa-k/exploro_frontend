import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Drawer,
  Divider,
} from '@mui/material';

const ChatDrawer = ({ isOpen, onClose,currentUserId,receiverId,receiverName }) => {  // Accept isOpen and onClose as props
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);


//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       setMessages([...messages, { text: newMessage, sender: 'user', time: new Date().toLocaleTimeString() }]);
//       setNewMessage('');
//     }
//   };

useEffect(() => {
    console.log('hai i am working');
    const roomName = [currentUserId, receiverId].sort().join('_');
    
    const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
    
    chatSocket.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket connected');


      };
  
    chatSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, {
        text: data.message,
        sender: data.sender_id === currentUserId ? 'user' : 'receiver',
        time: new Date().toLocaleTimeString()
      }]);    };

    chatSocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    chatSocket.onclose = () => {
      setIsConnected(false);
      console.log('Chat socket closed');
    };

    setSocket(chatSocket);

    return () => {
      chatSocket.close(); 
    };
  }, [currentUserId,receiverId]);


  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        message: newMessage,
        sender_id: currentUserId, // Include the sender ID
        receiver_id: receiverId, // Include the receiver ID
      };
      socket.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [...prevMessages, { text: newMessage, sender: 'user', time: new Date().toLocaleTimeString() }]);
      setNewMessage('');
    }
  };

  return (
    <Drawer
    anchor="right"
    open={isOpen}
    onClose={onClose}
    PaperProps={{
      sx: {
        width: '70vw',
        display: 'flex',
        flexDirection: 'row',
      },
    }}
  >
    {/* Receiver info */}
    <Box
      sx={{
        width: '40%',
        padding: 2,
        bgcolor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Avatar sx={{ width: 50, height: 50, marginRight: 2 }}>
          {receiverName}
        </Avatar>
        <Box>
          <Typography variant="h6">{receiverName}</Typography>
          <Typography variant="body2" color="textSecondary">
            ID: {receiverId}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ marginY: 2, width: '100%' }} />
    </Box>

    {/* Chat area */}
    <Box
      sx={{
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #e0e0e0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Typography variant="h6">Chat</Typography>
        <Button onClick={onClose} style={{ color: 'white' }}>
          Close
        </Button>
      </Box>

      <List
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
          bgcolor: 'background.paper',
        }}
      >
        {messages.map((msg, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 1,
            }}
          >
            {msg.sender !== 'user' && (
              <Avatar sx={{ marginRight: 2, width: 40, height: 40 }}>
                {receiverName}
              </Avatar>
            )}
            <Box
              sx={{
                border: `2px solid ${msg.sender === 'user' ? '#007bff' : '#b0bec5'}`,
                backgroundColor: msg.sender === 'user' ? '#e3f2fd' : '#f1f1f1',
                padding: 1,
                borderRadius: 10,
                maxWidth: '75%',
                boxShadow: 1,
                position: 'relative',
              }}
            >
              <ListItemText primary={msg.text} />
              <Typography
                variant="caption"
                sx={{ position: 'absolute', right: 10, bottom: -20, fontSize: '0.75rem' }}
              >
                {msg.time}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          display: 'flex',
          padding: 2,
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          variant="outlined"
        />
        <Button onClick={handleSendMessage} variant="contained" sx={{ marginLeft: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  </Drawer>
  );
};

export default ChatDrawer;
