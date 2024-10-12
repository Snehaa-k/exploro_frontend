import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete"; // For delete button
import { useNavigate } from "react-router-dom"; // For redirecting
import api from "../../../axios-interceptors/AxiosInterceptors";

const NotificationDrawer = ({ isOpen, onClose, currentUserId }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  console.log(notifications);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await api.get("notification/");
      setNotifications(response.data);
      setLoad(true);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark a single notification as read
  const markAsRead = async (id, redirectUrl) => {
    try {
      await api.post(`mark_as_read/${id}`);
      navigate(redirectUrl);
      setLoad(true);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Delete a read notification
  const deleteNotification = async (id) => {
    try {
      await api.delete(`notification/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div style={{ width: "300px" }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <List>
          {notifications && notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <ListItem
                key={index}
                button
                onClick={() => markAsRead(notification.id, notification.link)} // Pass the ID and redirect URL
                style={{
                  backgroundColor: notification.is_read ? "#e0e0e0" : "#ffffff", // Change color if read
                }}
              >
                <ListItemText
                  primary={
                    <span style={{ display: "flex", alignItems: "center" }}>
                      {notification.text}
                      {!notification.is_read && (
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "red",
                            marginLeft: "8px", // Space between text and dot
                          }}
                        />
                      )}
                    </span>
                  }
                  secondary={notification.time}
                />
                {notification.is_read && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the markAsRead function
                      deleteNotification(notification.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No new notifications" />
            </ListItem>
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default NotificationDrawer;
