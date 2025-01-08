import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from "axios";
import { Google as GoogleIcon, Apple as AppleIcon } from '@mui/icons-material'; // Using a different icon

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      if (response.data.error) {
        setMessage(response.data.error);
        setMessageType("error");
      } else {
        setMessage("Successfully Logged in");
        setMessageType("success");
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("username", response.data.username);

        setTimeout(() => navigate("/home"), 2000); // Redirect to Home page
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-green-900"> Agrimo</h1>
              <p className="mt-2 text-gray-500">Let’s Make Magic Happen</p>
            </div>
            <Box display="flex" justifyContent="center" gap={2} mb={3}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Sign up with Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<AppleIcon />}
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Sign up with Apple
            </Button>
          </Box>
            <div className="text-center text-gray-500 mb-6">or</div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Username or Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="example@gmail.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
                  required
                />
                
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span></span>
                <button type="button">Forgot Password?</button>
              </div>
              <button
                type="submit"
                className="w-full bg-green-900 text-white py-2 rounded-lg font-medium"
                sx={{ backgroundColor: '#2c3e50' }}
              >
                Login
              </button>
            </form>
            <div className="text-center mt-4 text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/signup" className="text-green-600 cursor-pointer">Register now.</a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50 relative">
          <div className="absolute text-center text-white top-1/2 transform -translate-y-1/2">
            <h2 className="text-4xl font-semibold">Welcome Back</h2>
            <p className="mt-4">We missed you! Log in to continue.</p>
          </div>
          <img
            src="https://i.pinimg.com/736x/cc/85/04/cc8504a94ecd9b4343c3f6c5abbcda67.jpg"
            alt="Login illustration"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
