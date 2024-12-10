import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setLogOut } from "../redux/state";
import "../styles/NavBar.scss";

const NavBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Search logic
  const [search, setSearch] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <a href="/">
        <img src="/src/assets/Chill Inn Turqiouse.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: "red" }}
            onClick={() => {
              navigate(`/chalets/search/${search}`);
            }}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing">Become Host</a>
        ) : (
          <a href="/users/login">Become a Host</a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        >
          <Menu sx={{ color: "red" }} />
          {!user ? (
            <Person sx={{ color: "red" }} />
          ) : (
            <img
              src={`http://localhost:5000/uploads/${user.profileImagePath
                .split("/")
                .pop()}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
              onClick={() => {
                // Check if the current location is not the user's profile page
                if (location.pathname !== `/users/${user._id}`) {
                  navigate(`/users/${user._id}`);
                }

                if (user.userType === "admin") {
                  navigate(`/users/admin/${user._id}`);
                }
              }}
            />
          )}
        </button>

        {dropDownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/users/login">Log In</Link>
            <Link to="/users/register">Sign Up</Link>
          </div>
        )}

        {dropDownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/bookings/${user._id}/trips`}>Trip List</Link>
            <Link to={`/bookings/${user._id}/wishlist`}>Wish List</Link>
            <Link to={`/bookings/${user._id}/properties`}>Property List</Link>
            <Link to={`/bookings/${user._id}/reservations`}>
              Reservation List
            </Link>
            <Link to="/create-listing">Become An Owner</Link>

            <Link
              to="/users/login"
              onClick={() => {
                dispatch(setLogOut());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
