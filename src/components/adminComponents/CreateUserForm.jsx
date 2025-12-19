import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../reUsableComponents/Button";
import Input from "../reUsableComponents/Input";
import Card from "../reUsableComponents/Card";
import { createUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateUserForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("OfficeStaff");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ username, email, password, role }))
      .unwrap()
      .then(() => {
        //  alert("User created successfully!");
        toast.success("User created successfully!");
        navigate("/user-management");
      })
      .catch((err) => {
        alert(`Error: ${err}`);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-light">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-dark">
          Create User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              isRequired={true}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              isRequired={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              isRequired={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-neutral focus:border-primary focus:outline-none transition-colors duration-300 shadow-custom-light"
            >
              <option value="OfficeStaff">Office Staff</option>
              <option value="Librarian">Librarian</option>
            </select>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="text-center">
            <Button type="submit" className="w-full" dispatch={loading}>
              {loading ? "Creating user..." : "Create User"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateUserForm;
