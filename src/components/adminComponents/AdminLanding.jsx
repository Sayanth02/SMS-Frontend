import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBook,
  FaHistory,
  FaDollarSign,
  FaCog,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminLanding = () => {
  const role = useSelector((state) => state.auth.user);
  console.log(role);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-[#f6b23b] to-[#f19263] text-white py-6 px-8 shadow">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-2">
          Manage and oversee all aspects of the system efficiently.
        </p>
      </header>

      <main className="p-8">
        <h2 className="text-xl font-semibold mb-6 text-secondary">
          Welcome, Admin!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* User Management */}
          <Link
            to="/user-management"
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200 border-t-4 border-accent"
          >
            <FaUsers className="text-primary text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center text-secondary">
              Manage Users
            </h3>
            <p className="text-gray-500 text-center mt-2">
              Add, remove, and manage user roles.
            </p>
          </Link>

          {/* Fees Management */}
          <Link
            to="/fees-management"
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200 border-t-4 border-accent"
          >
            <FaDollarSign className="text-green-600 text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center text-secondary">
              Manage Fees
            </h3>
            <p className="text-gray-500 text-center mt-2">
              Track and update fee records.
            </p>
          </Link>

          

          {/* Library Management */}
          <Link
            to="/library-management"
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200 border-t-4 border-accent"
          >
            <FaBook className="text-red-500 text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center text-secondary">
              Manage Library
            </h3>
            <p className="text-gray-500 text-center mt-2">
              Oversee books and library activities.
            </p>
          </Link>

          {/* Settings */}
          <Link
            to="/settings"
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200 border-t-4 border-accent"
          >
            <FaCog className="text-gray-500 text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center text-secondary">
              Settings
            </h3>
            <p className="text-gray-500 text-center mt-2">
              Configure system preferences.
            </p>
          </Link>

          
        </div>
      </main>
    </div>
  );
};

export default AdminLanding;
