import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../reUsableComponents/Button";
import Input from "../reUsableComponents/Input";
import Card from "../reUsableComponents/Card";
import {
  fetchLibrary,
  updateLibrary,
} from "../../../redux/slices/librarySlice";
import { fetchStudents } from "../../../redux/slices/studentSlice";
import { toast } from "react-toastify";

const UpdateLibraryForm = () => {
  const [studentId, setStudentId] = useState("");
  const [bookName, setBookName] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("Borrowed");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const students = useSelector((state) => state.student.students);
  const loading = useSelector((state) => state.library.loading);
  const error = useSelector((state) => state.library.error);

  const library = useSelector((state) =>
    state.library.libraries.find((lib) => lib._id === id)
  );
  console.log(library);

  useEffect(() => {
    dispatch(fetchLibrary());
    dispatch(fetchStudents());
  }, []);

  useEffect(() => {
    if (library) {
      const student = students.find(
        (student) => student._id === library.student._id
      );
      setStudentId(student ? student._id : "");
      setBookName(library.bookName);
      setBorrowDate(library.borrowDate.split("T")[0]);
      setReturnDate(library.returnDate.split("T")[0]);
      setStatus(library.status);
    }
  }, [library]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const libraryData = { studentId, bookName, borrowDate, returnDate, status };
    dispatch(updateLibrary({id:id, libraryData}))
      .unwrap()
      .then(() => {
        toast.success("Library record updated successfully!");
        dispatch(fetchLibrary());
        navigate("/library-management");
      })
      .catch((err) => {
         toast.error('something went wrong')
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <Card className="w-full max-w-md p-8 shadow-xl bg-white rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Update Library Record
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Student
            </label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition duration-200"
            >
              <option value="" disabled>
                Select Student
              </option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Book Name Input */}
          <div>
            <Input
              type="text"
              placeholder="Book Name"
              value={bookName}
              label={"Book Name"}
              onChange={(e) => setBookName(e.target.value)}
              isRequired={true}
            />
          </div>

          {/* Borrow Date Input */}
          <div>
            <Input
              type="date"
              placeholder="Borrow Date"
              value={borrowDate}
              label={"Borrow Date"}
              onChange={(e) => setBorrowDate(e.target.value)}
              isRequired={true}
            />
          </div>

          {/* Return Date Input */}
          <div>
            <Input
              type="date"
              placeholder="Return Date"
              value={returnDate}
              label={"Return Date"}
              isRequired={true}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition duration-200"
            >
              <option value="Borrowed">Borrowed</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              className={`w-full transition duration-200 ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Updating Library Record..." : "Update Library Record"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UpdateLibraryForm;
