import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudents } from '../../../redux/slices/studentSlice'
import Input from '../reUsableComponents/Input'
import { Card } from '@mui/material'
import Button from '../reUsableComponents/Button'
import { createFee, fetchFees } from '../../../redux/slices/feesSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddFeesForm = () => {
  const [studentId, setStudentId] = useState('')
  const [feeType, setFeeType] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentDate, setPaymentDate] = useState('')
  const [remarks, setRemarks] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const students = useSelector(state => state.student.students)
  const loading = useSelector(state => state.fees.loading)
  const error = useSelector(state => state.fees.error)

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(
      createFee({
        student: studentId,
        feeType,
        amount,
        paymentDate,
        remarks
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Fee history added successfully!");
        dispatch(fetchFees())
        navigate('/fees-management')
      })
      .catch(err => {
        toast.error(`something went wrong`);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <Card className="w-full max-w-md p-8  ">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add Fee
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
              isRequired={true}
              label={"Fee Type"}
              onChange={(e) => setFeeType(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Amount"
              isRequired={true}
              value={amount}
              label={"Amount"}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="date"
              placeholder="Payment Date"
              value={paymentDate}
              isRequired={true}
              label={"Payment Date"}
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
          {error && (
            <div className="text-red-500 text-sm">Something went wrong</div>
          )}
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
              {loading ? "Adding Fee History..." : "Add Fee History"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AddFeesForm
