import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const UserTable = () => {
  // const users = [
  //   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  //   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  //   {
  //     id: 3,
  //     name: "Alice Johnson",
  //     email: "alice@example.com",
  //     role: "Moderator",
  //   },
  // ];

  const token = useSelector((state) => state.token);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const users = await response.json();
        setUsers(users);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err);
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Update the UI by filtering out the deleted user
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err.message);
      alert("Error deleting user: " + err.message);
    }
  };

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="mt-8 bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold mb-4">User Management</h3>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user._id}</td>
              <td className="border px-4 py-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.userType}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
