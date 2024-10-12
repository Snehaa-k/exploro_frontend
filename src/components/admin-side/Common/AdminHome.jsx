import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItem, ListItemText, List, ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReportIcon from "@mui/icons-material/Report";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useState } from "react";
import { useNavigate } from "react-router";
// import { logoutadmin } from '../../../redux/actions/authActions';
import { useDispatch } from "react-redux";
import { logoutadmin } from "../../../redux/actions/authActions";

const AdminHome = () => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const dispatch = useDispatch();

  const handlelogout = async () => {
    const response = dispatch(logoutadmin());
    console.log("clicked");
    if (response) {
      navigate("/adminlog");
    }
  };
  return (
    <div>
      <div className="navbar-container">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Admin
              </Typography>
              <div style={{ marginRight: "150px" }}>
                <Button color="inherit">Home</Button>
                <Button color="inherit">username</Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div
        style={{ backgroundColor: "#BFE8FF", width: "100%", height: "200px" }}
      >
        {selectedMenuItem === "Dashboard" && (
          <Typography
            variant="h5"
            style={{ marginLeft: "370px", paddingTop: "50px" }}
          >
            Welcome to the Dashboard
          </Typography>
        )}
        {selectedMenuItem === "Travellers" && (
          <Typography
            variant="h5"
            style={{ marginLeft: "370px", paddingTop: "50px" }}
          >
            Traveller Information
          </Typography>
        )}
        {selectedMenuItem === "TraveLeaders" && (
          <Typography
            variant="h5"
            style={{ marginLeft: "370px", paddingTop: "50px" }}
          >
            Travel Leaders Information
          </Typography>
        )}
        {selectedMenuItem === "Requests" && (
          <Typography
            variant="h5"
            style={{ marginLeft: "370px", paddingTop: "50px" }}
          >
            Request Details
          </Typography>
        )}
        {/* {selectedMenuItem === 'Complaints' && (
          <Typography variant='h5' style={{ marginLeft: '370px', paddingTop: '50px' }}>Complaint Information</Typography>
        )} */}
        {selectedMenuItem === "LogOut" && (
          <Typography
            variant="h5"
            style={{ marginLeft: "370px", paddingTop: "50px" }}
          >
            Logging Out...
          </Typography>
        )}
      </div>

      <div
        className="sidebar-container"
        style={{ marginLeft: "10px", marginTop: "-140px" }}
      >
        <div className="side-bar">
          <Box
            p={2}
            sx={{
              backgroundColor: "#f9f9f9",
              height: "vh",
              marginTop: "50px",
              paddingLeft: "20px",
            }}
          >
            <List>
              <Typography
                style={{ paddingBottom: "20px", paddingLeft: "20px" }}
              >
                Admin Dashboard
              </Typography>
              {[
                {
                  text: "Travellers",
                  icon: <PeopleIcon />,
                  path: "/travellers",
                },
                {
                  text: "TraveLeaders",
                  icon: <SupervisedUserCircleIcon />,
                  path: "/travelleaders",
                },
                {
                  text: "Requests",
                  icon: <AssignmentIcon />,
                  path: "/requestss",
                },
                { text: "Complaints", icon: <ReportIcon />, path: "/report" },
                {
                  text: "LogOut",
                  icon: <ExitToAppIcon />,
                  onClick: handlelogout,
                },
              ].map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      navigate(item.path || "#");
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
