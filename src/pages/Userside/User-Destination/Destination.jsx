import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Slider,
  Box,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import MainView from "../../../components/user-side/user-destinations/MainView/MainView";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../axios-interceptors/AxiosInterceptors";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import Pagination from '@mui/material/Pagination'; // Import Pagination

const SearchBar = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(2),
}));

const FilterBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  width: "100%",
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#F50057",
  color: "#fff",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#c51162",
  },
}));

const monthMapping = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const Destination = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [duration, setDuration] = useState([1, 30]);
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [tripType, setTripType] = useState("");
  const [trips, setTrips] = useState([]);
  const [travelead, setTravelLeads] = useState([]);
  const [user, setUser] = useState();
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set the number of items per page

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const HandleProfile = () => {
    navigate("/travellerprofile");
  };
  const HandleDestination = () => {
    navigate("/destination");
  };
  const HandleHome = () => {
    navigate("/posts");
  };
  const handleClick = (id) => {
    navigate(`/viewdestination/${id}`);
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get(`/viewalltrips/`);
        const tripsWithMonth = response.data.trip.map((trip) => ({
          ...trip,
          month: dayjs(trip.start_date).format("MMMM"),
        }));
        setTrips(tripsWithMonth);
        setUser(response.data.user);
        const ids = response.data.trip.map((trip) => trip?.travelead || null);
        setTravelLeads(ids);
      } catch (error) {
        console.error("Error fetching trips:", error.message);
      }
    };

    fetchTrips();
  }, [token]);

  const filteredTrips = trips.filter((trip) => {
    const tripMonthNumber = dayjs(trip.start_date).month() + 1;
    const tripMonth = monthMapping[tripMonthNumber];

    return (
      trip.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedMonth || tripMonth === selectedMonth) &&
      trip.duration >= duration[0] &&
      trip.duration <= duration[1] &&
      trip.amount >= priceRange[0] &&
      trip.amount <= priceRange[1] &&
      (!tripType || trip.trip_type === tripType) &&
      trip.participant_limit > 0 &&
      trip.is_completed !== "cancelled"
    );
  });

  // Calculate the current trips to be displayed
  const indexOfLastTrip = currentPage * itemsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - itemsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage); // Total pages for pagination

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page when the page changes
  };

  const menuItems = [
    { label: "Home", onClick: HandleHome },
    { label: "Destination", onClick: HandleDestination },
    { label: "Profile", onClick: HandleProfile },
  ];

  return (
    <div>
      <Navbar title="Exploro" menuItems={menuItems} />
      <div style={{ paddingTop: "60px", marginLeft: "0px", marginTop: "45px" }}>
        <Typography align="center" variant="h5">
          Find Your Destination
        </Typography>
      </div>

      <Container maxWidth="md" sx={{ marginTop: "4px" }}>
        <SearchBar
          variant="outlined"
          fullWidth
          placeholder="Search for trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterBox>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Month</InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  label="Month"
                >
                  <MenuItem value="">Any Month</MenuItem>
                  {Object.entries(monthMapping).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Type of Trip</InputLabel>
                <Select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  label="Type of Trip"
                >
                  <MenuItem value="">Any Type</MenuItem>
                  <MenuItem value="Adventure">Adventure</MenuItem>
                  <MenuItem value="Historical Sites">Historical Sites</MenuItem>
                  <MenuItem value="Famous Cities">Famous Cities</MenuItem>
                  <MenuItem value="Natural Wonders">Natural Wonders</MenuItem>
                  <MenuItem value="Hilly areas">Hilly areas</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box marginBottom={2}>
                <Typography gutterBottom>Duration (days)</Typography>
                <Slider
                  value={duration}
                  onChange={(e, newValue) => setDuration(newValue)}
                  valueLabelDisplay="auto"
                  min={1}
                  max={30}
                  step={1}
                  aria-labelledby="range-slider"
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box marginBottom={2}>
                <Typography gutterBottom>Price Range (₹)</Typography>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={4000}
                  step={10}
                  aria-labelledby="range-slider"
                />
              </Box>
            </Grid>
          </Grid>
        </FilterBox>
        <Grid container spacing={4}>
          {currentTrips.length ? (
            currentTrips.map((trip) => (
              <Grid item xs={12} sm={4} md={4} key={trip.id}>
                <Box onClick={() => handleClick(trip.id)} sx={{ cursor: "pointer" }}>
                  <MainView trip={trip} />
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                No trips found
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Pagination Component */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Container>
    </div>
  );
};

export default Destination;
