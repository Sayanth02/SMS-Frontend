import React, { useState } from "react";
import Card from "../reUsableComponents/Card";
import Input from "../reUsableComponents/Input";
import Button from "../reUsableComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../../../redux/slices/studentSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CreateStudentForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [standard, setStandard] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.student.loading);
  const error = useSelector((state) => state.student.error);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createStudent({ name, age, standard }))
      .unwrap()
      .then(() => {
        toast.success("Student created successfully!");
        navigate("/student-management");
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-light">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-dark">
          Create Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              isRequired={true}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Age"
              value={age}
              isRequired={true}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <select
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              className="px-4 py-2 w-full text-lg rounded-xl border-2 border-neutral  focus:outline-none transition-colors duration-300 shadow-custom-light bg-transparent appearance-none"
              required
            >
              <option value="" disabled>
                Select Standard
              </option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((std) => (
                <option key={std} value={std}>
                  {std}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="text-center">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating student..." : "Create Student"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateStudentForm;
