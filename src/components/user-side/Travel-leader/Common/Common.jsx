import React, { useEffect, useState } from "react";
import Actions from "../../../Profile-Components/Actions/Actions";
import EditIcon from "@mui/icons-material/Edit";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/Logout";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Navbar from "../../../Navbar/Navbar";
import "./Common.css";
import { API_URL } from "../../../../apiservice/Apiservice";
import { useDispatch } from "react-redux";
import { fetchuser } from "../../../../redux/actions/authActions";
import { useNavigate } from "react-router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { logoutUser } from "../../../../redux/reducers/authReducers";
import ChatDrawer from "../../ChatDialog/ChatDialog";
import NotificationDrawer from "../../Notificationdrawer/NotificationDrawer";
import NotificationSystem from "../../Notification/Notification";
import api from "../../../../axios-interceptors/AxiosInterceptors";

const CommonLayout = ({ children }) => {
  const [profile, setProfile] = useState([]);
  console.log(profile, "hai common");
  const [receiverId, setReceiverId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotificationCount] = useState(0);

  const [partners, setChatPartners] = useState(0);
  console.log(partners, "hai partners..");
  const [unreadmessages, setunreadmessage] = useState(0);
  const [unreadmessagess, setunreadmessages] = useState(0);

  const dispatch = useDispatch();
  const handleOpenChat = (receiverId) => {
    setReceiverId(receiverId);
    setIsChatOpen(true);
    setunreadmessage(0);
  };
  const handleCloseChat = () => {
    setIsChatOpen(false);
    setunreadmessage(0);
    setReceiverId(null);
  };
  const notificationCount = unreadmessages ? unreadmessages : partners;
  // const notificationCounts=unreadmessagess?unreadmessagess:notifications

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleOpenNotification = () => {
    setIsNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
    setunreadmessages(0);
  };

  const handleNewNotification = (message) => {
    setNotificationMessage(message);
    setSnackbarOpen(true);
  };

  const handlecount = (count) => {
    setunreadmessage(count);
  };

  const handlecounts = (count) => {
    setunreadmessages(count);
  };

  useEffect(() => {
    const fetchChatPartners = async () => {
      try {
        const response = await api.get("/chat-partners/");
        console.log(response, "haiiii...res");

        const filteredChatPartners = response.data.filter(
          (partner) => partner.last_message?.receiver === profile?.user?.id,
        );

        const totalUnreadCount = filteredChatPartners.reduce(
          (total, partner) => {
            return total + (partner.unread_count || 0);
          },
          0,
        );
        setChatPartners(totalUnreadCount);
      } catch (error) {
        console.error("Error fetching chat partners:", error);
      }
    };
    fetchChatPartners();
  }, [isChatOpen, profile, snackbarOpen, partners, notificationCount]);

  const navigate = useNavigate();
  const HandleProfile = () => {
    navigate("/travellerprofile");
  };
  const HandleDestination = () => {
    navigate("/destination");
  };
  const HandleHome = () => {
    navigate("/posts");
  };

  const handlelogout = async () => {
    const response = dispatch(logoutUser());
    if (response) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await dispatch(fetchuser());
        console.log(response.payload);

        if (response) {
          setProfile(response.payload.profile);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const menuItemsNavbar = [
    { label: "Home", onClick: HandleHome },
    { label: "Profile", onClick: HandleProfile },
    { label: "Destination", onClick: HandleDestination },
  ];

  const menuItemsActions = [
    { text: "Edit Profile", icon: <EditIcon />, path: "/editprofile" },
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Inbox",
      icon: <MessageIcon />,
      onClick: handleOpenChat,
      count: notificationCount,
    },
    {
      text: "Alerts",
      icon: <NotificationsIcon />,
      onClick: () => setIsNotificationOpen(true),
    },
    { text: "Planned Trips", icon: <FlightTakeoffIcon />, path: "/viewtrip" },
    { text: "Create Trip", icon: <EventNoteIcon />, path: "/triplan" },
    { text: "LogOut", icon: <ExitToAppIcon />, onClick: handlelogout },
  ];

  return (
    <div className="common-layout-container">
      <div className="navbar">
        <Navbar menuItems={menuItemsNavbar} />
      </div>
      <div className="main-content">
        <div className="actions">
          <Actions
            avatarSrc={`${API_URL}${profile.profile_image}`}
            menuItems={menuItemsActions}
          />
        </div>
        <div className="trip-creation medium-size">
          {children}
          <ChatDrawer
            isOpen={isChatOpen}
            onClose={handleCloseChat}
            currentUserId={profile?.user?.id}
            receiverId={receiverId}
            receiverName={null}
          />
          <NotificationDrawer
            isOpen={isNotificationOpen}
            onClose={handleCloseNotification}
            currentUserId={profile?.user?.id}
          />
          <NotificationSystem
            open={isNotificationOpen}
            onClose={handleCloseNotification}
            userId={profile?.user?.id}
            onCount={handlecount}
            oncountnot={handlecounts}
          />
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
