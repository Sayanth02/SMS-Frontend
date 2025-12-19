import { Link } from "react-router-dom";
import { FaUsers, FaBook, FaHistory, FaDollarSign } from "react-icons/fa";

const StaffLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white py-8 px-10 shadow-xl">
        <h1 className="text-3xl font-bold">Office Staff Dashboard</h1>
        <p className="mt-2 text-lg">
          Manage student details, fees, and library history.
        </p>
      </header>

      {/* Main Content */}
      <main className="p-10">
        <h2 className="text-2xl font-semibold mb-8 text-secondary">
          Welcome, Office Staff!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Manage Students */}
          <Link
            to="/student-management"
            className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-t-4 border-accent"
          >
            <FaUsers className="text-primary text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center">
              Manage Students
            </h3>
            <p className="text-sm text-center mt-2 text-gray-600">
              Add, edit, and manage student details.
            </p>
          </Link>

          {/* Manage Fees */}
          <Link
            to="/manage-fees"
            className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-t-4 border-accent"
          >
            <FaDollarSign className="text-green-600 text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center">Manage Fees</h3>
            <p className="text-sm text-center mt-2 text-gray-600">
              View and update student fees history.
            </p>
          </Link>

          {/* Library History */}
          <Link
            to="/library-history"
            className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-t-4 border-accent"
          >
            <FaBook className="text-red-500 text-3xl mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center">
              Library History
            </h3>
            <p className="text-sm text-center mt-2 text-gray-600">
              Access and manage library records.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default StaffLanding;
