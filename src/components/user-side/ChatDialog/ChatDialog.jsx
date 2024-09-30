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
  Snackbar,
  Alert,
} from '@mui/material';
import api from '../../../axios-interceptors/AxiosInterceptors';




const ChatDrawer = ({ isOpen, onClose, currentUserId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [chatPartners, setChatPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  console.log(chatPartners,"hai chatpartners");
  

  useEffect(() => {
    if (isOpen) {
      fetchChatPartners();
    }
  }, [isOpen]);

  const fetchChatPartners = async () => {
    try {
      const response = await api.get('/chat-partners/'); 
      const sortedChatPartners = response.data.sort((a, b) => {
        const aTimestamp = a.last_message?.timestamp ? new Date(a.last_message.timestamp) : 0;
        const bTimestamp = b.last_message?.timestamp ? new Date(b.last_message.timestamp) : 0;
        return bTimestamp - aTimestamp; // Sort in descending order
      });
      setChatPartners(sortedChatPartners);
    } catch (error) {
      console.error('Error fetching chat partners:', error);
    }
  };

//  read or unread.......................
const markMessagesAsRead = async (partnerId) => {
  try {
    await api.post('/mark-all-messages-as-read/', { partner_id: partnerId });
    // Update the local state to reflect that the messages are read
    setMessages(prevMessages =>
      prevMessages.map(msg => ({ ...msg, isRead: true })) // Mark all messages as read
    );
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
};

  useEffect(() => {
    if (selectedPartner) {
      console.log(selectedPartner,"seleted P");
      
      const fetchMessages = async () => {
        try {
          const response = await api.get(`/messages/${selectedPartner.id}/`);
          const fetchedMessages = response.data.map(msg => ({
            id: msg.id,
            text: msg.content,
            sender: msg.sender === currentUserId ? 'user' : 'partner',

            time: new Date(msg.timestamp).toLocaleTimeString(),
            isRead: msg.is_read,

          }));
          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    }
  }, [selectedPartner]);

  useEffect(() => {
    if (isOpen && currentUserId && (receiverId || selectedPartner)) {
      const partnerIdToUse = receiverId || selectedPartner.id;
      const chatSocket = new WebSocket(`ws://localhost:8000/ws/chat/?receiver_id=${partnerIdToUse}&user_id=${currentUserId}`);

      chatSocket.onopen = () => {
        setIsConnected(true);
      };

      chatSocket.onmessage = function(e) {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'chat_message') {
            console.log(data,"hai data");
            
            const isUserSender = data.sender === currentUserId;

            if (!isUserSender) {
              setNotificationMessage(`New message from ${selectedPartner.username}: ${data.content}`);
              // onNewNotification(`New message from ${selectedPartner.username}: ${data.content}`);
              setSnackbarOpen(true);
            }

            console.log(isUserSender,"is user")
            setMessages(prevMessages => [
              ...prevMessages,
              {
                text: data.content,
                sender: isUserSender ? 'user' : 'partner',
                time: new Date().toLocaleTimeString(),
              },
            ]);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      chatSocket.onclose = () => {
        setIsConnected(false);
      };

      setSocket(chatSocket);

      return () => {
        chatSocket.close();
      };
    }
  }, [isOpen, currentUserId, receiverId, selectedPartner]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        message: newMessage,
        sender_id: currentUserId,
        receiver_id: receiverId || selectedPartner.id,
      };

      socket.send(JSON.stringify(messageData));
      setNewMessage('');
    }
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  const handlePartnerSelect = (partner) => {
    setSelectedPartner(partner);
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
      {/* Chat partners list */}
      <Box sx={{ width: '30%', borderRight: '1px solid #e0e0e0', overflowY: 'auto', cursor: 'pointer' }}  onClick={() =>  markMessagesAsRead(selectedPartner.id)}>
        <Typography variant="h6" sx={{ p: 2 }}>Chat Partners</Typography>
        <List>
          {chatPartners.map((partner) => (
            <ListItem 
              button 
              key={partner.id} 
              onClick={() => handlePartnerSelect(partner)}
              selected={selectedPartner?.id === partner.id}
            >
              <Avatar alt={partner.username} src={partner.avatarUrl || ''} />
              <ListItemText 
                primary={partner.username} 
                secondary={partner.unreadMessages > 0 ? `(${partner.unreadMessages} unread)` : ''}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat area */}
      <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
          {messages.map((msg, index) => (
            <Box 
            key={msg.id}  // Use message ID as the key
            sx={{ 
              margin: 1, 
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
             
            }}
            >
              <Box 
                sx={{ 
                  maxWidth: '70%', 
                  borderRadius: 1, 
                  bgcolor: msg.sender === 'user' ? '#d1e7dd' : '#f8d7da',
                  padding: 1,
                  boxShadow: 1
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
                <Typography variant="caption" color="textSecondary">{msg.time}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', padding: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button variant="contained" onClick={handleSendMessage}>Send</Button>
        </Box>
      </Box>
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar> */}
    </Drawer>
  );
};

export default ChatDrawer;
