import { useState } from "react";
import Login from "./components/user-side/login-page/Login";
import Home from "./components/user-side/home-page/Home";
import SignupPage from "./components/user-side/signup-page/SignupPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RoleSelection from "./components/user-side/role-selection/RoleSelection";
import UserPreference from "./components/user-side/userpreference/UserPreference";
import OtpVerificationPage from "./components/user-side/otp-veification/OtpVerification";
import { Bounce, ToastContainer } from "react-toastify";
import FormSubmission from "./components/user-side/formsubmission/FormSubmission";
import PostsPage from "./components/user-side/Posts-page/PostsPage";
import Navbar from "./components/Navbar/Navbar";
import UserPost from "./pages/Userside/User-Post/UserPost";
import EditProfile from "./pages/Userside/Traveller/edit-profile/EditProfile";
import AdminLogin from "./components/admin-side/Login/AdminLogin";
import AdminHome from "./components/admin-side/Common/AdminHome";
import ViewTravellers from "./components/admin-side/Travellers/ViewTravellers";
import Request from "./components/admin-side/request/Request";
import TravelLeaderDetails from "./components/admin-side/leader-detailView/DetailedView";
import ViewTravelLeaders from "./components/admin-side/TravelLeaders/ViewTravelLeader";
import TravellerProfile from "./pages/Userside/Traveller/TravellerProfile";
import NotFoundPage from "./pages/404error/Error404";
import PlanTrips from "./pages/Userside/TravelLeader/Trip-page/planTrips/PlanTrips";
import CreateTrip from "./components/user-side/Travel-leader/PlanTripComponent/CreateTrip";
import ViewTrip from "./pages/Userside/TravelLeader/Trip-page/ViewTrips/ViewTrip";
import Destination from "./pages/Userside/User-Destination/Destination";
import PlaceInformation from "./components/user-side/user-destination-view/places-information/PlaceInformation";
import DestinationTabs from "./components/user-side/user-destination-view/destination-tabs/DestinationTabs";
import TourPlan from "./components/user-side/user-destination-view/destination-information/DestinationInformation";
import UserDestination from "./pages/UserDestinationView/UserDestination";
import UserProfile from "./components/user-side/Userprofileview/UserProfile";
import ProfileView from "./pages/Userside/TravelLeader/profileview/ProfileView";
import SuccessPage from "./components/user-side/user-destination-view/success-page/Success";
import TripDetails from "./components/admin-side/Trip-details/TripDetails";
import BookedCustomers from "./components/admin-side/Booked-customers/BookedCustomers";
import DashBoardPage from "./pages/Userside/TravelLeader/Dashboard-page/DashBoardPage";
import ForgotPassword from "./components/user-side/FogotPassword/ForgotPassword";
// import ResetPassword from './components/user-side/resetpassword/ResetPassword'
import ResetPassword from "./components/user-side/resetpassword/ResetPassWord";
import ProtectedRoute from "./pages/UserHomeProtected";
import Userloginprotected from "./pages/UserLoginProtected";
import Adminprotected from "./pages/AdminProtected";
import Userlistprotected from "./pages/AdminListProtected";
import ReportRequests from "./components/admin-side/complaints/Report";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Userloginprotected>
                    <Navigate to="/login" />
                  </Userloginprotected>
                }
              />
              <Route path="/:mode" element={<Home />} />
              <Route
                path="/otp-verification"
                element={<OtpVerificationPage />}
              />
              {/* <Route path ='/posts' element={<PostsPage/>}/>            */}
              <Route path="/formsubmission" element={<FormSubmission />} />
              <Route
                path="/adminlog"
                element={
                  <Adminprotected>
                    <AdminLogin />
                  </Adminprotected>
                }
              />
              <Route path="/travellers" element={<ViewTravellers />} />
              <Route path="/requestss" element={<Request />} />
              <Route path="/request/:id" element={<TravelLeaderDetails />} />
              <Route path="/travelleaders" element={<ViewTravelLeaders />} />
              <Route
                path="/editprofile"
                element={
                  <ProtectedRoute>
                    {" "}
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/travellerprofile"
                element={
                  <ProtectedRoute>
                    <TravellerProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/posts" element={<UserPost />} />
              <Route
                path="/triplan"
                element={
                  <ProtectedRoute>
                    <PlanTrips />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/viewtrip"
                element={
                  <ProtectedRoute>
                    <ViewTrip />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/destination"
                element={
                  <ProtectedRoute>
                    <Destination />
                  </ProtectedRoute>
                }
              />

              <Route path="/places" element={<TourPlan />} />

              <Route
                path="/viewdestination/:id"
                element={
                  <ProtectedRoute>
                    <UserDestination />
                  </ProtectedRoute>
                }
              />
              <Route path="/userprofile/:id" element={<ProfileView />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/viewleadertrip/:id" element={<TripDetails />} />
              <Route path="/dashboard" element={<DashBoardPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/password-reset-confirm/:id/:token"
                element={<ResetPassword />}
              />
              <Route path="/report" element={<ReportRequests />} />
              {/* <Route path = '/viewcustomers/:id' element = {<BookedCustomers/>}/> */}
            </Routes>
          </Router>
        </h1>
      </div>
    </>
  );
}

export default App;
