import React from "react";
import UserList from "../../components/adminComponents/UserList"; 
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { useSelector } from "react-redux";

const UserManagement = () => {

  return (
    <div className="bg-light p-6 rounded-lg shadow-md h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          User Management
        </h1>

        <Link to={"/createUser"}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-3">
            <FiUserPlus /> Add User
          </button>
        </Link>
      </div>

      {/* User List Section */}
      <UserList />
    </div>
  );
};

export default UserManagement;
