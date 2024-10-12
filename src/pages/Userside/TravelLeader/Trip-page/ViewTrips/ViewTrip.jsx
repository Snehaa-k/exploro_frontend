import React from "react";
import CommonLayout from "../../../../../components/user-side/Travel-leader/Common/Common";
import TripList from "../../../../../components/user-side/Travel-leader/ViewCreatedTrips/ViewTrips";

const ViewTrip = () => {
  return (
    <div>
      <CommonLayout>
        <TripList />
      </CommonLayout>
    </div>
  );
};

export default ViewTrip;
