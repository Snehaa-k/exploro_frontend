import React, { useEffect, useState } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NotificationSystem = ({ userId, open, onClose,username }) => {
    const [notifications, setNotifications] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);  
    const [user,setusername] = useState('')

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

            
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]');
        };

        return () => {
            socket.close();
        };
    }, [userId]); 
    const handleNotification = (notification) => {
        setNotifications((prev) => [...prev, notification]);
        setOpenSnackbar(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
        if (onClose) {
            onClose();  // Call parent onClose if provided
        }
    };

    return (
        <div>
            <Snackbar
                open={openSnackbar}  // Use local state for Snackbar
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
                  New message from {user} : {notifications.length > 0 ? notifications[notifications.length - 1]: 'No new notifications'}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default NotificationSystem;
