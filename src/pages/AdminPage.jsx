import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Dashboard from "../components/Dashboard";
import UserTable from "../components/UserTable";

const AdminPage = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow">
        <AdminNavbar />
        <div className="p-6">
          <Dashboard />
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
