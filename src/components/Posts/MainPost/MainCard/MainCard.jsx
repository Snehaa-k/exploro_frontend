import React from "react";
import { CardContent, Avatar, Typography, Box } from "@mui/material";

const TravelLeaderCard = ({ avatarUrl, post, name, time }) => {
  return (
    <CardContent sx={{ display: "flex", alignItems: "center" }}>
      <Avatar
        src={avatarUrl || post.travelead_profile_image}
        alt={name}
        sx={{ marginRight: 2 }}
      />
      <Box>
        <Typography variant="h6">{post.travelead_username}</Typography>
        <Typography variant="body2" color="textSecondary">
          {"Travel Leader"}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {time}
        </Typography>
      </Box>
    </CardContent>
  );
};

export default TravelLeaderCard;
