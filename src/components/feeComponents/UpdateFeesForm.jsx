import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../../redux/slices/studentSlice";
import Input from "../reUsableComponents/Input";
import { Card } from "@mui/material";
import Button from "../reUsableComponents/Button";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFees, updateFee } from "../../../redux/slices/feesSlice";
import { toast } from "react-toastify";

const UpdateFeeForm = () => {
  const { feeId } = useParams();
  const [studentId, setStudentId] = useState("");
  const [feeType, setFeeType] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector((state) => state.student.students);
  const loading = useSelector((state) => state.fees.loading);
  const error = useSelector((state) => state.fees.error);
  const fee = useSelector((state) =>
    state.fees.fees.find((fee) => fee._id === feeId)
  );

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchFees());
  }, [dispatch]);

  useEffect(() => {
    if (fee) {
      const student = students.find(
        (student) => student._id === fee.student._id
      );
      setStudentId(student ? student._id : "");
      setFeeType(fee.feeType);
      setAmount(fee.amount);
      setPaymentDate(fee.paymentDate.split("T")[0]);
      setRemarks(fee.remarks);
    }
  }, [fee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const feeData = { feeType, amount, paymentDate, remarks };
    console.log(feeData);

    dispatch(updateFee({ id: feeId, feeData }))
      .unwrap()
      .then(() => {
        toast.success("Fee history updated successfully!");
        dispatch(fetchFees());
        navigate("/fees-management");
      })
      .catch((err) => {
        toast.error(`something went wrong`);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <Card className="w-full max-w-md p-8  ">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Update Fee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div>
            <Input
              type="text"
              placeholder="Fee Type"
              value={feeType}
              label={"Fee Type"}
              isRequired={true}
              onChange={(e) => setFeeType(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              label={"Amount"}
              isRequired={true}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="date"
              placeholder="Payment Date"
              value={paymentDate}
              label={"Payment Date"}
              isRequired={true}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Remarks"
              value={remarks}
              label={"Remarks"}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="text-center">
            <Button
              type="submit"
              className={`w-full ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Updating Fee History..." : "update Fee History"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UpdateFeeForm;
