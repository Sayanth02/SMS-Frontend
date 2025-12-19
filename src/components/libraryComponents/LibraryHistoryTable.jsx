import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const LibraryHistoryTable = ({
  data,
  onEdit,
  onDelete,
  onStatusChange,
  userRole,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const canEditOrDelete = userRole === "Admin" || userRole === "Librarian";

  // Filtered data based on search term
  const filteredData = data.filter(
    (library) =>
      library.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      library.student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      {/* Search bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 px-3 py-2 border border-neutral rounded-lg shadow-sm outline-none "
        />
      </div>
      <table className="min-w-full bg-white border-collapse border border-neutral">
        <thead>
          <tr className="bg-primaryDark">
            <th className="border border-neutral px-4 py-2 text-left text-light">
              #
            </th>
            <th className="border border-neutral px-4 py-2 text-left text-light">
              Student Name
            </th>
            <th className="border border-neutral px-4 py-2 text-left text-light">
              Standard
            </th>
            <th className="border border-neutral px-4 py-2 text-left text-light">
              Book Name
            </th>
            <th className="border border-neutral px-4 py-2 text-left text-light">
              Borrow Date
            </th>
            <th className="border border-neutral px-4 py-2 text-left text-light">
              Return Date
            </th>
            <th className="border border-neutral px-4 py-2 text-left text-light">
              Status
            </th>
            {canEditOrDelete && (
              <th className="border border-neutral px-4 py-2 text-left text-light">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((library, index) => (
            <tr key={library._id} className="hover:bg-gray-50">
              <td className="border border-neutral px-4 py-2">{index + 1}</td>
              <td className="border border-neutral px-4 py-2">
                {library.student.name}
              </td>
              <td className="border border-neutral px-4 py-2">
                {library.student.standard}
              </td>
              <td className="border border-neutral px-4 py-2">
                {library.bookName}
              </td>
              <td className="border border-neutral px-4 py-2">
                {new Date(library.borrowDate).toLocaleDateString()}
              </td>
              <td className="border border-neutral px-4 py-2">
                {new Date(library.returnDate).toLocaleDateString()}
              </td>
              <td className="border border-neutral px-4 py-2">
                {canEditOrDelete ? (
                  <button
                    onClick={() =>
                      onStatusChange(
                        library._id,
                        library.status === "Borrowed" ? "Returned" : "Borrowed"
                      )
                    }
                    className={`px-3 py-1 rounded text-white ${
                      library.status === "Borrowed"
                        ? "bg-error hover:bg-red-600"
                        : "bg-success hover:bg-green-600"
                    }`}
                  >
                    {library.status}
                  </button>
                ) : (
                  <span
                    className={`px-3 py-1 rounded ${
                      library.status === "Borrowed"
                        ? "bg-error/20 text-error"
                        : "bg-success/20 text-success"
                    }`}
                  >
                    {library.status}
                  </span>
                )}
              </td>
              {canEditOrDelete && (
                <td className="border border-neutral px-4 py-2">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => onEdit(library)}
                      className="text-accent hover:text-yellow-700"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(library)}
                      className="text-error hover:text-red-700"
                    >
                      <FiTrash size={18} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibraryHistoryTable;
