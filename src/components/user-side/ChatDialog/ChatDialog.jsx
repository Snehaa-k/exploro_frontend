import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import api from "../../../axios-interceptors/AxiosInterceptors";

const ChatDrawer = ({ isOpen, onClose, currentUserId, receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [chatPartners, setChatPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchChatPartners();
    }
  }, [isOpen]);

  const fetchChatPartners = async () => {
    try {
      const response = await api.get("/chat-partners/");
      const sortedChatPartners = response.data.sort((a, b) => {
        const aTimestamp = a.last_message?.timestamp ? new Date(a.last_message.timestamp) : 0;
        const bTimestamp = b.last_message?.timestamp ? new Date(b.last_message.timestamp) : 0;
        return bTimestamp - aTimestamp;
      });
      setChatPartners(sortedChatPartners);

      // Automatically select the receiver if provided
      if (receiverId) {
        const partnerToSelect = sortedChatPartners.find((partner) => partner.id === receiverId);
        if (partnerToSelect) {
          setSelectedPartner(partnerToSelect);
          await markMessagesAsRead(partnerToSelect.id);
          await fetchMessages(partnerToSelect.id);
        } else {
          // If receiver is not found, set selectedPartner using receiverName
          setSelectedPartner({ id: receiverId, username: receiverName });
          // Optionally: Show a message indicating no existing chat
        }
      }
    } catch (error) {
      console.error("Error fetching chat partners:", error);
    }
  };

  const markMessagesAsRead = async (partnerId) => {
    try {
      await api.post("/mark-all-messages-as-read/", { partner_id: partnerId });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  useEffect(() => {
    if (selectedPartner) {
      const fetchMessages = async () => {
        try {
          const response = await api.get(`/messages/${selectedPartner.id}/`);
          const fetchedMessages = response.data.map((msg) => ({
            id: msg.id,
            text: msg.content,
            sender: msg.sender === currentUserId ? "user" : "partner",
            time: new Date(msg.timestamp).toLocaleTimeString(),
          }));
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedPartner]);

  useEffect(() => {
    if (isOpen && currentUserId && (receiverId || selectedPartner)) {
      const partnerIdToUse = receiverId || selectedPartner.id;
      const chatSocket = new WebSocket(
        `ws://13.53.42.87/ws/chat/?receiver_id=${partnerIdToUse}&user_id=${currentUserId}`,
      );

      chatSocket.onopen = () => {
        console.log("WebSocket connected");
      };

      chatSocket.onmessage = function (e) {
        try {
          const data = JSON.parse(e.data);
          if (data.type === "chat_message") {
            const isUserSender = data.sender === currentUserId;
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                text: data.content,
                sender: isUserSender ? "user" : "partner",
                time: new Date().toLocaleTimeString(),
              },
            ]);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      chatSocket.onclose = () => {
        console.log("WebSocket closed");
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
      setNewMessage("");
    }
  };

  const handlePartnerSelect = (partner) => {
    setSelectedPartner(partner);
    markMessagesAsRead(partner.id);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "70vw",
          display: "flex",
          flexDirection: "row",
          background: "linear-gradient(135deg, #f3f4f6, #fff)",
          borderRadius: "8px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Chat partners list */}
      <Box
        sx={{
          width: "30%",
          borderRight: "1px solid #e0e0e0",
          overflowY: "auto",
          backgroundColor: "#f9fafb",
        }}
      >
        <Typography variant="h6" sx={{ p: 2, fontWeight: "bold", color: "#333" }}>
          <ChatIcon fontSize="small" /> Chats
        </Typography>
        <List>
          {chatPartners.map((partner) => (
            <ListItem
              button
              key={partner.id}
              onClick={() => handlePartnerSelect(partner)}
              selected={selectedPartner?.id === partner.id}
              sx={{
                padding: "10px 15px",
                borderRadius: "10px",
                margin: "5px 10px",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              <Avatar alt={partner.username} src={partner.avatarUrl || ""} />
              <ListItemText
                primary={partner.username}
                secondary={
                  partner.unread_count > 0 && (
                    <Typography variant="body2" sx={{ color: "#d32f2f", fontWeight: "bold" }}>
                      {`(${partner.unread_count} unread)`}
                    </Typography>
                  )
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat area */}
      <Box sx={{ width: "70%", display: "flex", flexDirection: "column", background: "#fff" }}>
        <Box sx={{ padding: 2, borderBottom: "1px solid #e0e0e0", display: "flex", alignItems: "center" }}>
          {selectedPartner ? (
            <>
              <Avatar alt={selectedPartner.username} src={selectedPartner.avatarUrl || ""} />
              <Typography variant="h6" sx={{ ml: 2 }}>
                {selectedPartner.username}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", flexGrow: 1 }}>
              Select a chat partner to start messaging!
            </Typography>
          )}
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
          {selectedPartner ? (
            messages.length > 0 ? (
              messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    padding: "5px",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "65%",
                      padding: "10px",
                      borderRadius: "12px",
                      backgroundColor: msg.sender === "user" ? "#bbf2e8" : "#f1f1f1",
                      color: msg.sender === "user" ? "#fff" : "#333",
                    }}
                  >
                    <Typography variant="body1">{msg.text}</Typography>
                    <Typography variant="caption" sx={{ color: "#999", marginTop: "5px", display: "block" }}>
                      {msg.time}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: "center", marginTop: 5 }}>
                No messages yet. Start chatting!
              </Typography>
            )
          ) : (
            <Box sx={{ textAlign: "center", marginTop: "100px" }}>
              <img
                src="/image/chatty.jpg"
                alt="Chat Partner"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Select a chat partner to see messages
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ padding: 1, display: "flex", borderTop: "1px solid #e0e0e0" }}>
          <TextField
            variant="outlined"
            placeholder="Type a message..."
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!selectedPartner}
            sx={{ borderRadius: "20px" }}
          />
          <Button onClick={handleSendMessage} color="primary" sx={{ ml: 1 }} disabled={!newMessage.trim()}>
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChatDrawer;
