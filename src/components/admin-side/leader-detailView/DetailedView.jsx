import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ThreeDots } from "react-loader-spinner";
import { API_URL } from "../../../apiservice/Apiservice";

const TravelLeaderDetails = () => {
  const [loading, setLoading] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  console.log(details);

  useEffect(() => {
    axios
      .get(`${API_URL}/details/${id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
      });
  }, [id]);

  const handleReject = (id) => {
    setIsloading(true);
    axios
      .post(`${API_URL}/reject/${id}/`)
      .then((response) => {
        console.log("Rejected:", response.data);
        Swal.fire({
          icon: "success",
          title: "Rejected Successfully!",
          text: "Rejected Successfully!",

          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/requestss");
        });
      })
      .catch((error) => {
        console.error("Error rejecting:", error);
      });
  };
  const handleAccept = (id) => {
    setLoading(true);
    axios
      .post(`${API_URL}/accept/${id}/`)
      .then((response) => {
        console.log("Accepted:", response.data);
        Swal.fire({
          icon: "success",
          title: "Accepted Successfully!",
          text: "Accepted Successfully!",

          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          navigate("/requestss");
        });
      })
      .catch((error) => {
        console.error("Error accepting:", error);
      });
  };

  // if (!details) return <Typography>Loading...</Typography>;

  return (
    <div style={{ marginTop: "70px" }}>
      <Paper style={{ padding: "20px", margin: "20px", height: "600px" }}>
        <Typography variant="h6" style={{ marginLeft: "620px" }}>
          Travel Leader Details
        </Typography>
        <div style={{ marginLeft: "320px", marginTop: "60px" }}>
          <Typography variant="body1">
            <h4 style={{ display: "inline" }}>First Name:</h4>{" "}
            {details.firstname}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "30px" }}>
            <h4 style={{ display: "inline" }}>Last Name: </h4>
            {details.lastname}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "30px" }}>
            {" "}
            <h4 style={{ display: "inline" }}>Email:</h4>{" "}
            {details.user_id?.email}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "30px" }}>
            <h4 style={{ display: "inline" }}>Mobile:</h4> {details.mobile}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "30px" }}>
            <h4 style={{ display: "inline" }}>Visited Countries:</h4>{" "}
            {details.visited_countries
              ?.map((country) => country.name)
              .join(", ")}
          </Typography>
          <Typography variant="body1" style={{ marginTop: "30px" }}>
            <h4 style={{ display: "inline" }}>CV File:</h4>{" "}
            <a href={details.cv}>View</a>
          </Typography>
          <Typography variant="body1" style={{ marginTop: "30px" }}>
            <h4 style={{ display: "inline" }}>ID Proof:</h4>
            <a href={details.id_proof}>View</a>
          </Typography>
          <div style={{ marginLeft: "500px" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleAccept(details.id)}
              style={{ marginTop: "30px" }}
            >
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="40"
                  width="80"
                  color="black"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperClass=""
                />
              ) : (
                "ACCEPT"
              )}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleReject(details.id)}
              style={{ marginTop: "30px", marginLeft: "50px" }}
            >
              {isloading ? (
                <ThreeDots
                  visible={true}
                  height="40"
                  width="80"
                  color="black"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperClass=""
                />
              ) : (
                "REJECT"
              )}
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default TravelLeaderDetails;
