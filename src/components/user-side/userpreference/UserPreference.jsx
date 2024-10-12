import React, { useState } from "react";
import { Button, Chip, Stack } from "@mui/material";

import "./Userpreference.css";
import { preferenseSelection } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const preferences = [
  "Historical Sites",
  "Natural Wonders",
  "Famous Cities",
  "Hilly areas",
  "Adventure",
];
const UserPreference = () => {
  const [selectedPreference, setSelectedPreference] = useState("");
  const users = useSelector((state) => state.reducer.user);
  console.log(users, "userss in preferences");
  // console.log(users.user.email);

  const email = users.user.user.email;
  // console.log('my email ',email);

  // const email = users.user?.email
  // console.log(email,"hi pref")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const email = 'lallu123@gmail.com'

  const handleSelect = (preference) => {
    setSelectedPreference(preference);
  };

  const handleFinish = () => {
    if (selectedPreference) {
      dispatch(preferenseSelection({ selectedPreference, email }))
        .then((response) => {
          if (response) {
            Swal.fire({
              icon: "success",
              title: "yay!.. all Finish...",
              text: "Redirecting to Login page...",
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            }).then(() => {
              navigate("/login");
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert("Please select a preference before finishing.");
    }
  };

  return (
    <div className="preference-container">
      <h6
        style={{
          textAlign: "center",
          marginTop: "30px",
          paddingLeft: "20px",
          marginLeft: "12px",
          marginRight: "25px",
        }}
      >
        What types of destinations are you most interested in..?
      </h6>
      <img src="/image/prefer.jpg" className="img-preference" />

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        style={{ marginLeft: "34px" }}
      >
        {preferences.map((preference) => (
          <Chip
            key={preference}
            label={preference}
            clickable
            color={selectedPreference === preference ? "primary" : "default"}
            style={{
              backgroundColor:
                selectedPreference === preference ? "#3f51b5" : "#e0e0e0",
              color: selectedPreference === preference ? "#fff" : "#000",
              marginTop: "24px",
              marginLeft: "15px",
            }}
            onClick={() => handleSelect(preference)}
          />
        ))}
      </Stack>
      <Button
        variant="contained"
        style={{
          backgroundColor: "black",
          marginLeft: "220px",
          marginTop: "20px",
        }}
        onClick={handleFinish}
      >
        finish
      </Button>
    </div>
  );
};

export default UserPreference;
