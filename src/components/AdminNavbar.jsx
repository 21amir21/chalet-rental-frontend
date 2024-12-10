import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../redux/state";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <Link
            to={`/users/${user._id}`}
            onClick={() => {
              if (location.pathname !== `/users/${user._id}`) {
                navigate(`/users/${user._id}`);
              }
            }}
            className="hover:underline"
          >
            Profile
          </Link>
          <Link
            to="/users/login"
            onClick={() => {
              dispatch(setLogOut());
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
