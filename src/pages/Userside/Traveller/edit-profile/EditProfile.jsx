import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import { Typography, TextField, Box, Button } from "@mui/material";
import { Uploader } from "rsuite";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";
import "./Editprofile.css";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../../../../components/Profile-Components/Actions/Actions";
import EditIcon from "@mui/icons-material/Edit";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import apiService, { API_URL } from "../../../../apiservice/Apiservice";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { reactToString } from "rsuite/esm/internals/utils";
import { logoutUser } from "../../../../redux/reducers/authReducers";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import api from "../../../../axios-interceptors/AxiosInterceptors";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [photo, setPhoto] = useState(null);
  console.log(profile, "profile");
  console.log(profile.is_travel_leader, "leader");
  console.log(profile.id, "id getting");

  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    address: "",
    bio: "",
    country_state: "",
    profile_image: null,
  });
  console.log(formData);
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  console.log(image);
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
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const FetchProfileDetail = async () => {
      try {
        const response = await api.get(`/profile`);
        console.log(response, "deatiled");
        setFormData({
          address: response.data.address || "",
          bio: response.data.bio || "",
          country_state: response.data.country_state || "",
          profile_image: response.data.profile_image || null,
        });
        setImage(response.data.profile_image || null);

        // setFormData();
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError("Error fetching profile");
        }
      }
    };

    FetchProfileDetail();
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/editprofile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile({
          id: response.data.id || "",
          username: response.data.username || "",
          email: response.data.email || "",
          is_travel_leader: response.data.is_travel_leader || "",
        });

        // setFormData();
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        } else {
          setError("Error fetching profile");
        }
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);

      setFormData((prev) => ({ ...prev, profile_image: file }));
      setImage(imageURL);
      setPhoto(imageURL);
    }
  };

  // useEffect(() => {
  //   console.log('Image URL updated:', image);
  // }, [formData]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // const formDataToSend = new FormData();

  const managedit = async (e) => {
    e.preventDefault();
    if (!formData.address) {
      alert("please add address");
      return;
    }
    if (!formData.bio) {
      alert("please add bio");
      return;
    }
    if (!formData.country_state) {
      alert("please add country and state");
      return;
    }
    // Ensure you have the image file
    if (!formData.profile_image) {
      alert("please add image");
      console.log("Please select an image to upload.");
      return;
    }

    const formDatasend = new FormData();
    formDatasend.append("profile_image", formData.profile_image);
    formDatasend.append("address", formData.address);
    formDatasend.append("bio", formData.bio);
    formDatasend.append("country_state", formData.country_state);

    try {
      const response = await api.post(`${API_URL}/profile/`, formDatasend);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Edited Successfully..",
          text: "Redirecting to Profile Page",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/travellerprofile");
        });
      }
      console.log(response);
      setEditing(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Error updating profile");
      }
    }
  };

  const handleEditClick = () => {
    setEditing((prev) => !prev);
  };

  const handleMenuClick = () => {
    console.log("Menu icon clicked");
  };

  const menuItems = [
    { label: "Home", onclick:HandleHome },
    { label: "Destination", onClick: HandleDestination },
  ];
  const HomePage = () => {
    const handleMenuClick = () => {
      console.log("Menu icon clicked");
    };
  };
  const menuItemsn = [
    { label: "Home", onClick: HandleHome },
    { label: "Destination", onClick: HandleDestination },
    { label: "Profile", onClick: HandleProfile },
  ];

  const menuItemsLead = [
    { label: "Home", onClick: HandleHome },
    { label: "Profile", onClick: HandleProfile },
    { label: "Destination", onClick: HandleDestination },
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      {profile.is_travel_leader ? (
        <Navbar
          title="Exploro"
          menuItems={menuItemsLead}
          onMenuClick={handleMenuClick}
        />
      ) : (
        <Navbar
          title="Exploro"
          menuItems={menuItemsn}
          onMenuClick={handleMenuClick}
        />
      )}

      {profile.is_travel_leader ? (
        <Actions
          avatarSrc={`${API_URL}${image}`}
          menuItems={[
            { text: "Edit Profile", icon: <EditIcon />, path: "/editprofile" },
            { text: "Inbox", icon: <MessageIcon />, path: "/inbox" },
            { text: "Alerts", icon: <NotificationsIcon />, path: "/alerts" },
            {
              text: "Planned Trips",
              icon: <FlightTakeoffIcon />,
              path: "/viewtrip",
            },
            { text: "Create Trip", icon: <EventNoteIcon />, path: "/triplan" },
            { text: "Log Out", icon: <ExitToAppIcon />, onClick: handlelogout },
          ]}
        />
      ) : (
        <Actions
          avatarSrc={`${API_URL}${image}`}
          menuItems={[
            { text: "Edit Profile", icon: <EditIcon />, path: "/editprofile" },
            { text: "Messages", icon: <MessageIcon />, path: "/messages" },
            {
              text: "Notifications",
              icon: <NotificationsIcon />,
              path: "/notifications",
            },
            { text: "Logout", icon: <LogoutIcon />, onClick: handlelogout },
          ]}
        />
      )}
      <Box component="form" onSubmit={managedit}>
        <div style={{ marginLeft: "600px", marginTop: "-550px" }}>
          <Typography variant="h4">Edit Profile</Typography>
          <div
            className="circle-uploader"
            style={{ marginLeft: "550px", marginTop: "-30px" }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div className="circle-background" onClick={handleClick}>
              {photo ? (
                <img src={photo} alt="Uploaded" className="uploaded-image" />
              ) : image ? (
                <img
                  src={`${API_URL}${image}`}
                  alt="Uploaded"
                  className="uploaded-image"
                />
              ) : (
                <CameraRetroIcon className="camera-icon" />
              )}
            </div>
          </div>
          <div style={{ marginTop: "-40px" }}>
            <TextField
              id="username-field"
              label="UserName"
              name="username"
              value={profile.username}
              variant="outlined"
              disabled={true}
              InputLabelProps={{ shrink: true }}
              style={{ marginRight: "50px" }}
            />
            <TextField
              id="email-field"
              label="Email Address"
              name="email"
              value={profile.email}
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              style={{ marginLeft: "50px" }}
            />
          </div>
          <div style={{ marginTop: "50px" }}>
            <TextField
              id="address-field"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              disabled={!editing}
              InputLabelProps={{ shrink: true }}
              style={{ marginRight: "50px", width: "500px" }}
            />
          </div>
          <div style={{ marginTop: "50px" }}>
            <TextField
              id="bio-field"
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              variant="outlined"
              disabled={!editing}
              InputLabelProps={{ shrink: true }}
              style={{ marginRight: "50px", width: "500px" }}
            />
          </div>
          <div style={{ marginTop: "50px" }}>
            <TextField
              id="country-state-field"
              label="Country, State"
              name="country_state"
              value={formData.country_state}
              onChange={handleChange}
              variant="outlined"
              disabled={!editing}
              InputLabelProps={{ shrink: true }}
              style={{ marginRight: "50px", width: "500px" }}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <Button onClick={handleEditClick}>
              {editing ? "Cancel" : "Edit"}
            </Button>
            {editing && <Button type="submit">Save</Button>}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default EditProfile;
