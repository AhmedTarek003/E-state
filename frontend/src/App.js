import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SingUp from "./pages/SignUp/SingUp";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Edit-Profile/EditProfile";
import CreateListing from "./pages/Create-Listing/CreateListing";
import EditListing from "./pages/Edit-Listing/EditListing";
import SingleListing from "./pages/Single-Listing/SingleListing";
import AllListings from "./pages/All-Listings/AllListings";
import NotFound from "./pages/Not-Found/NotFound";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/Forgot-Password/ForgotPassword";
import ResetPassword from "./pages/Reset-Password/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-center" autoClose={1300} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!user ? <Navigate to={"/signIn"} /> : <Home />}
          />
          <Route
            path="/signIn"
            element={user ? <Navigate to={"/"} /> : <SignIn />}
          />
          <Route
            path="/signUp"
            element={user ? <Navigate to={"/"} /> : <SingUp />}
          />
          <Route
            path="/profile/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <Profile />}
          />
          <Route
            path="/edit-profile/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <EditProfile />}
          />
          <Route
            path="/create-listing"
            element={!user ? <Navigate to={"/signIn"} /> : <CreateListing />}
          />
          <Route
            path="/edit-listing/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <EditListing />}
          />
          <Route
            path="/single-listing/:id"
            element={!user ? <Navigate to={"/signIn"} /> : <SingleListing />}
          />
          <Route
            path="/listings"
            element={!user ? <Navigate to={"/signIn"} /> : <AllListings />}
          />
          <Route
            path="/forgot-password"
            element={user ? <Navigate to={"/"} /> : <ForgotPassword />}
          />
          <Route
            path="/password/:userId/reset-password/:token"
            element={user ? <Navigate to={"/"} /> : <ResetPassword />}
          />
          <Route
            path="/users/:userId/verify/:token"
            element={<VerifyEmail />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
