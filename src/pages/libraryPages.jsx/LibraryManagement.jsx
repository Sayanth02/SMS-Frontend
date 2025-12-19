import React from "react";
import LibraryHistory from "../../components/libraryComponents/LibraryHistory";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

const LibraryManagement = () => {
  const userRole = localStorage.getItem("role");
  return (
    <div className="bg-light p-6 rounded-lg shadow-md h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Library Management
        </h1>

        {(userRole === "Admin" || userRole === "Librarian") && (
          <Link to={"/addLibrary"}>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-3">
              <HiOutlineDocumentAdd /> Add Record
            </button>
          </Link>
        )}
      </div>
      {/* User List Section */}
      <LibraryHistory />
    </div>
  );
};

export default LibraryManagement;
