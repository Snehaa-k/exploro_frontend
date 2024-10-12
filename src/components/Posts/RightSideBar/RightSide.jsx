import React from "react";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./RightSide.css";

const Sidebar = ({
  profileImage,
  name,
  role,
  bio,
  menuItems,
  notificationCount,
  chatCount,
}) => {
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: "#f9f9f9",
        width: { xs: "100%", sm: "300px" },
        position: { xs: "static", sm: "fixed" },
        right: { sm: "20px" },
        marginTop: { xs: "0", sm: "20px" },
        marginBottom: { xs: "20px", sm: "0" },
      }}
    >
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Avatar
            src={profileImage || "https://via.placeholder.com/50"}
            alt={name || "User"}
            sx={{ marginRight: 2 }}
          />
          <Box>
            <Typography variant="body2">{name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {role || "Travel Leader"}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={item.onClick}>
              <ListItemIcon>
                {item.text === "Notifications" ? (
                  <Badge badgeContent={notificationCount} color="error">
                    {item.icon}
                  </Badge>
                ) : item.text === "Chats" ? (
                  <Badge badgeContent={chatCount} color="error">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Sidebar;
