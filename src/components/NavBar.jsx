import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogOut } from "../redux/state";
import "../styles/NavBar.scss";

const NavBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <a href="/">
        <img src="/assests/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input type="text" placeholder="Search ..." />
        <IconButton>
          <Search sx={{ color: "red" }} />
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
            />
          )}
        </button>

        {dropDownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/users/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropDownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to="">Wish List</Link>
            <Link to="">Property List</Link>
            <Link to="">Reservation List</Link>
            <Link to="">Become An Owner</Link>

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
