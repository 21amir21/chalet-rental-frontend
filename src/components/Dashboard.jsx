import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = useSelector((state) => state.token);

  const [customerCount, setCustomerCount] = useState(0);
  const [ownerCount, setOwnerCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [loading, setLoading] = useState(true);

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
        // setUsers(users);

        const customers = users.filter((user) => user.userType === "customer");
        const owners = users.filter((user) => user.userType === "owner");
        const admins = users.filter((user) => user.userType === "admin");

        setCustomerCount(customers.length);
        setOwnerCount(owners.length);
        setAdminCount(admins.length);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerCount, ownerCount, adminCount]);

  return loading ? (
    <Loader />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Total Customers</h3>
        <p className="text-2xl font-bold">{customerCount}</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Total Owners</h3>
        <p className="text-2xl font-bold">{ownerCount}</p>
      </div>
      <div className="bg-red-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Total Admins</h3>
        <p className="text-2xl font-bold">{adminCount}</p>
      </div>
    </div>
  );
};

export default Dashboard;
