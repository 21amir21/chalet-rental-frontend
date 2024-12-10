import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ChaletDetails from "./pages/ChaletDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import PaypalPayment from "./components/PaypalPayment";
import CompletePayment from "./pages/CompletePayment";
import UserProfile from "./pages/UserProfile";
import AdminPage from "./pages/AdminPage";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* TODO: some changes need to be done here */}
          <Route path="/" element={<HomePage />} />
          <Route path="/users/register" element={<RegisterPage />} />
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/chalets/:chaletId" element={<ChaletDetails />} />
          <Route
            path="/chalets/category/:category"
            element={<CategoryPage />}
          />
          <Route path="/chalets/search/:search" element={<SearchPage />} />
          <Route path="/bookings/:userId/trips" element={<TripList />} />
          <Route path="/bookings/:userId/wishlist" element={<WishList />} />
          <Route
            path="/bookings/:userId/properties"
            element={<PropertyList />}
          />
          <Route
            path="/bookings/:userId/reservations"
            element={<ReservationList />}
          />
          <Route path="/payments" element={<PaypalPayment />} />
          <Route path="/payments/complete" element={<CompletePayment />} />
          <Route
            path="/users/:userId"
            element={
              user ? (
                <UserProfile
                  user={{
                    userId: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    profilePhoto: user.profilePhoto,
                  }}
                />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route path="/users/admin/:userId" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
