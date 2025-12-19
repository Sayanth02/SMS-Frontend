import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSchool } from "react-icons/fa";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-dark text-light shadow-lg">
      <div className="max-w-7xl ps-10 ">
        <div className="flex items-center  h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="text-xl font-bold flex gap-4 items-center"
            >
              <FaSchool className="text-3xl" /> School Manangement System
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
