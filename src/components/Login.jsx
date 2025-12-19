import React, { useEffect, useState } from "react";
import Button from "./reUsableComponents/Button";
import Input from "./reUsableComponents/Input";
import Card from "./reUsableComponents/Card";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await dispatch(login({ email, password }));
    if (response.payload?.token) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", response.payload.user.role);
      navigate("/dashboard");
      toast.success("Login Successful", {
        position: "top-center",
      });
    } else {
      toast.error("Login failed.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gradient-to-r from-[#3B82F6] to-[#6366F1]"
    >
      <Card className="w-full max-w-md py-12 px-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center text-primary">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              isRequired={true}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:ring-2 focus:ring-primary transition duration-200"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Enter your password"
              isRequired={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:ring-2 focus:ring-primary transition duration-200"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="text-center">
            <Button
              type="submit"
              className="w-full py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
