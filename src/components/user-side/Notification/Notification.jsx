import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import ChatDrawer from '../ChatDialog/ChatDialog';

const NotificationSystem = ({ userId, open, onClose,username ,onCount,oncountnot}) => {
    const [notifications, setNotifications] = useState([]);
    const [notify,setnotify] = useState([])
    const [openSnackbar, setOpenSnackbar] = useState(false);  
    const [user,setusername] = useState('')
    const [isChatOpen, setIsChatOpen] = useState(false); 
    const [receiverId, setReceiverId] = useState(null);
    
    const handleOpenChat = (receiverId) => {
        setReceiverId(receiverId);
        setIsChatOpen(true);
        setunreadmessage(0)
      };
      const handleCloseChat = () => {
        setIsChatOpen(false);
        setunreadmessage(0)
        setReceiverId(null); 
      };
    
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/notification/?user_id=${userId}`);

        socket.onopen = () => {
            console.log('WebSocket connection established notif================================');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Notification received:[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[', data);
            handleNotification(data.message);
            setusername(data.user)
            console.log(data.sender);
            console.log(data.unread_count+1);
            console.log(data,"notifyyyyyyyyyyyyyyyyyyyyyyyyyy");
            
            setnotify(data.text)
            
            
            if (data.type){
                oncountnot((prevCount) => prevCount + 1||0)
            }else{
                onCount((prevCount) => prevCount + 1||0)

            }
            

            
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
        };

        return () => {
            socket.close();
        };
    }, [userId,isChatOpen,onClose,notify]); 
    const handleNotification = (notification) => {
        setNotifications((prev) => [...prev, notification]);
        setOpenSnackbar(true);
    };

    const handleRedirect = (receiverId) => {
       
        setReceiverId(receiverId);  
        setIsChatOpen(true);        
        setOpenSnackbar(false);
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
        if (onClose) {
            onClose();  
        }
    };

    return (
        <div>
            <Snackbar
                open={openSnackbar}  
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    onClose={handleClose}
                    severity="info"
                    action={
                        <IconButton 
                            size="small" 
                            aria-label="close" 
                            color="inherit" 
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                   {notify ? (
            notifications.length > 0 ? notify : 'No new notifications'
          ) : (
            <Button 
              onClick={() => handleRedirect(userId)} // Ensure `userId` is correctly passed
              style={{ color: '#1976d2', cursor: 'pointer' }}
            >
              New message from {user}: {notifications.length > 0 ? notifications[notifications.length - 1] : 'No new notifications'}
            </Button>
          )}
                  {/* New message from {user} : {notifications.length > 0 ? notifications[notifications.length - 1]: 'No new notifications'} */}
                </Alert>
            </Snackbar>
            {isChatOpen && (
                <ChatDrawer 
                    isOpen={isChatOpen} 
                    onClose={handleCloseChat} 
                    receiverId={receiverId}  
                />
            )}
        </div>
    );
};

export default NotificationSystem;
