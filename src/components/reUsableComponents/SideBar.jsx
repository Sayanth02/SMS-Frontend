import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import { PiStudentFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { IoLibrary } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { showConfirmationDialog } from "../../util/showConfirmationDialog";

const Sidebar = ({ userRole, onLogout }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

   const handleLogout = () => {
      const actionLogout = () => {
        dispatch(logout());
        navigate("/");
      };
      showConfirmationDialog({
        type: "logout",
        confirmAction: actionLogout,
      });
    };
  
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div
      className={`h-full ${
        isOpen ? "w-64" : "w-20"
      } bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-light  transition-width duration-200 relative flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-center p-3">
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? "" : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-4 px-4">
          {/* Admin-Specific Links */}
          {userRole === "Admin" && (
            <li>
              <Link
                to="/user-management"
                className="flex gap-2 items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:text-accent transition duration-200"
              >
                <FaUser />
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  Manage Users
                </span>
              </Link>
            </li>
          )}

          {/* Common Links for All Users */}
          <li>
            <Link
              to="/student-management"
              className="flex gap-2 items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:text-accent transition duration-200"
            >
              <PiStudentFill />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                {userRole === "Librarian" ? "View Students" : "Manage Students"}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/fees-management"
              className="flex gap-2 items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:text-accent transition duration-200"
            >
              <RiMoneyDollarBoxLine />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                {userRole === "Librarian" ? "View Fees" : "Manage Fees"}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/library-management"
              className="flex gap-2 items-center px-4 py-2 rounded-md hover:bg-gray-700 hover:text-accent transition duration-200"
            >
              <IoLibrary />
              <span className={`${isOpen ? "block" : "hidden"}`}>
                View Library
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-5">
        <button
          onClick={handleLogout}
          className="flex items-center text-sm py-2 px-4 rounded-lg bg-error text-light hover:bg-error-dark focus:outline-none transition duration-200 ease-in-out"
        >
          <FiLogOut className="mr-2 text-light" />
          <span className={`${isOpen ? "block" : "hidden"} text-light`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
