import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const Table = ({ columns, data, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const userRole = localStorage.getItem("role");

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    columns.some((column) =>
      item[column.accessor]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="overflow-x-auto">
      {/* Search Bar */}
      <div className="flex justify-end px-4 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72 px-4 py-2 border border-neutral rounded-full shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-primaryDark">
              {/* Render column headers */}
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-4 py-2 text-left text-light"
                >
                  {column.Header}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render filtered table rows */}
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b">
                {columns.map((column) => (
                  <td key={column.accessor} className="px-4 py-2  ">
                    {item[column.accessor]}
                  </td>
                ))}
                {/* Render action buttons */}
                <td className="px-4 py-2">
                  <div className="flex space-x-5">
                    <button
                      onClick={() => onEdit(item)}
                      className={`${
                        userRole === "Librarian"
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-accent hover:text-yellow-700"
                      }`}
                      disabled={userRole === "Librarian"}
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className={`${
                        userRole === "Librarian"
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-error hover:text-red-700"
                      }`}
                      disabled={userRole === "Librarian"}
                    >
                      <FiTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Show a message if no data matches the search */}
        {filteredData.length === 0 && (
          <div className="text-center text-neutral mt-4">
            No records found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
