import React from 'react';
import CreateTrip from '../../../../../components/user-side/Travel-leader/PlanTripComponent/CreateTrip.jsx'
import './PlanTrip.css';
import CommonLayout from '../../../../../components/user-side/Travel-leader/Common/Common.jsx';


const PlanTrips = () => {
 

  return (
    <div className="plan-trips-container">
      <CommonLayout>
        <CreateTrip />
      </CommonLayout>
       
    </div>
  );
}

export default PlanTrips;
