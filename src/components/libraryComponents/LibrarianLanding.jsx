import { Link } from "react-router-dom";

const LibrarianLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white py-8 px-10 shadow-xl">
        <h1 className="text-3xl font-bold">Librarian Dashboard</h1>
        <p className="mt-2 text-lg">
          Manage library records and view student details.
        </p>
      </header>

      {/* Main Content */}
      <main className="p-10">
        <h2 className="text-2xl font-semibold mb-8 text-secondary">
          Welcome, Librarian!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* View Library Records */}
          <Link
            to="/view-library"
            className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-t-4 border-accent"
          >
            <h3 className="text-lg font-semibold text-center">
              View Library Records
            </h3>
            <p className="text-sm text-center mt-2 text-gray-600">
              Access and manage library records and books.
            </p>
          </Link>

          {/* View Student Details */}
          <Link
            to="/student-details"
            className="p-6 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-t-4 border-accent"
          >
            <h3 className="text-lg font-semibold text-center">
              View Student Details
            </h3>
            <p className="text-sm text-center mt-2 text-gray-600">
              View student information and their library activity.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LibrarianLanding;
