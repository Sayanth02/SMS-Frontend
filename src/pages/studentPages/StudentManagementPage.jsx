import React from "react";
import StudentList from "../../components/staffComponents/StudentList";
import { PiStudentBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const StudentManagementPage = () => {
  const userRole = localStorage.getItem("role");
  
  return (
    <div className="bg-light p-6 rounded-lg shadow-md h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Student Management
        </h1>

        {(userRole === "Admin" || userRole === "OfficeStaff") && (
          <Link to={"/createStudent"}>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-3">
              <PiStudentBold /> Add Student
            </button>
          </Link>
        )}
      </div>

      {/* User List Section */}
      <StudentList />
    </div>
  );
};

export default StudentManagementPage;
