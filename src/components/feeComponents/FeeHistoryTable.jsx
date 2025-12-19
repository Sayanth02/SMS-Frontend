import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

const FeeHistoryTable = ({ data, onEdit, onDelete, userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Determine actions based on user role
  const getActionsForRole = (role) => {
    switch (role) {
      case "Admin":
        return { canEdit: true, canDelete: true };
      case "OfficeStaff":
        return { canEdit: true, canDelete: true };
      case "Librarian":
        return { canEdit: false, canDelete: false };
      default:
        return { canEdit: false, canDelete: false };
    }
  };

  const { canEdit, canDelete } = getActionsForRole(userRole);

  const filteredData = data.filter((fees) =>
    fees.student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-light">Fee History</h2>
        <input
          type="text"
          placeholder="Search by Student Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-neutral rounded-lg shadow-sm focus:outline-none "
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
              Fee Type
            </th>
            <th className="border border-neutral px-4 py-2 text-left text-light">
              Amount
            </th>
            <th className="border border-neutral px-4 py-2 text-left text-light">
              Payment Date
            </th>
            <th className="border border-neutral px-4 py-2 text-left text-light">
              Remarks
            </th>
            {(userRole === "Admin" || userRole === "OfficeStaff") && (
              <th className="border border-neutral px-4 py-2 text-left text-light">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((fees, index) => (
            <tr key={fees._id} className="hover:bg-gray-50">
              <td className="border border-neutral px-4 py-2">{index + 1}</td>
              <td className="border border-neutral px-4 py-2">
                {fees.student.name}
              </td>
              <td className="border border-neutral px-4 py-2">
                {fees.student.standard}
              </td>
              <td className="border border-neutral px-4 py-2">
                {fees.feeType}
              </td>
              <td className="border border-neutral px-4 py-2">{fees.amount}</td>
              <td className="border border-neutral px-4 py-2">
                {new Date(fees.paymentDate).toLocaleDateString()}
              </td>
              <td className="border border-neutral px-4 py-2">
                {fees.remarks}
              </td>

              {/* Conditionally render the Actions column */}
              {(canEdit || canDelete) && (
                <td className="border border-neutral px-4 py-2">
                  <div className="flex space-x-4">
                    {canEdit && (
                      <button
                        onClick={() => onEdit(fees)}
                        className="text-accent hover:text-yellow-700"
                      >
                        <FiEdit size={18} />
                      </button>
                    )}
                    {canDelete && (
                      <button
                        onClick={() => onDelete(fees)}
                        className="text-error hover:text-red-700"
                      >
                        <FiTrash size={18} />
                      </button>
                    )}
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

export default FeeHistoryTable;
