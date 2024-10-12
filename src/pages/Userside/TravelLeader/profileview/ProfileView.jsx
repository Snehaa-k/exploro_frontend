import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import UserProfile from "../../../../components/user-side/Userprofileview/UserProfile";
import { useNavigate } from "react-router";

const ProfileView = () => {
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

  const menuItemsn = [
    { label: "Home", onClick: HandleHome },
    { label: "Destination", onClick: HandleDestination },
    { label: "Profile", onClick: HandleProfile },
  ];
  return (
    <div>
      <Navbar menuItems={menuItemsn} />
      <UserProfile />
    </div>
  );
};

export default ProfileView;
