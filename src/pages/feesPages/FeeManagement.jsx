import React from "react";
import FeeHistory from "../../components/feeComponents/FeeHistory";
import { Link } from "react-router-dom";
import { HiOutlineDocumentAdd } from "react-icons/hi";

const FeeManagement = () => {
  const userRole = localStorage.getItem("role");
  return (
    <div className="bg-light p-6 rounded-lg shadow-md h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Fees Management
        </h1>
        {(userRole === "Admin" || userRole === "OfficeStaff") && (
          <Link to={"/addFees"}>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-3">
              <HiOutlineDocumentAdd /> Add Record
            </button>
          </Link>
        )}
      </div>
      {/* User List Section */}
      <FeeHistory />
    </div>
  );
};

export default FeeManagement;
