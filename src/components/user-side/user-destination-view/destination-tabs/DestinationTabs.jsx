import React from "react";
import { useState } from "react";
import { Box, Tabs, Tab, Button, Container } from "@mui/material";
import TourPlan from "../destination-information/DestinationInformation";
import TripDetails from "../places-information/PlaceInformation";
import { useNavigate } from "react-router";
import BookingForm from "../book-trip/BookingForm";

const DestinationTabs = ({ tripId }) => {
  const [value, setValue] = useState(0);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    if (value < 3) setValue(value + 1);
  };

  const handleBack = () => {
    if (value > 0) setValue(value - 1);
  };

  return (
    <div>
      <Container>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs"
            centered
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Information" />
            <Tab label="Places" />
            <Tab label="Book Trip" />
            {/* <Tab label="Payment" /> */}
          </Tabs>
          <Box p={3}>
            {value === 0 && <TripDetails tripId={tripId} />}
            {value === 1 && <TourPlan tripId={tripId} />}
            {value === 2 && <BookingForm tripId={tripId} />}
            {/* {value === 3 } */}
          </Box>
          {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={handleBack} disabled={value === 0}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={value === 3}>
            Next
          </Button>
        </Box> */}
        </Box>
      </Container>
    </div>
  );
};

export default DestinationTabs;
