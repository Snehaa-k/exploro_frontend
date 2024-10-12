import React from "react";
import CreateTrip from "../../../../../components/user-side/Travel-leader/PlanTripComponent/CreateTrip.jsx";
import "./PlanTrip.css";
import CommonLayout from "../../../../../components/user-side/Travel-leader/Common/Common.jsx";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const PlanTrips = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <div className="plan-trips-container">
      <CommonLayout>
        <CreateTrip />
      </CommonLayout>
    </div>
  );
};

export default PlanTrips;
