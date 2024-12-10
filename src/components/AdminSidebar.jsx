import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 space-y-6">
      <h2 className="text-xl font-semibold">Navigation</h2>
      <ul className="space-y-3">
        <li>
          <a href="#" className="block hover:bg-gray-700 p-2 rounded">
            Dashboard
          </a>
        </li>
        <li>
          <Link
            to={`/users/${user._id}`}
            onClick={() => {
              if (location.pathname !== `/users/${user._id}`) {
                navigate(`/users/${user._id}`);
              }
            }}
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link to="/" className="block hover:bg-gray-700 p-2 rounded">
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
