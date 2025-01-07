import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Google as GoogleIcon, Apple as AppleIcon } from '@mui/icons-material';
import axios from 'axios';

const SingupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(response.data.message);
      setError('');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000); // Delay for showing success message
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
    >
      <Box
        display="flex"
        flexDirection="row"
        width={{ xs: '95%', sm: '80%', md: '70%' }}
        bgcolor="white"
        boxShadow={3}
        borderRadius={2}
        overflow="hidden"
      >
        {/* Left Section - Form */}
        <Box
          flex={1}
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h4" fontWeight="bold" mb={2} align="center">
            Create an Account
          </Typography>
          <Typography variant="subtitle1" mb={3} align="center">
            Let’s Make Magic Happen
          </Typography>

          {/* Social Signup Buttons */}
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

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Username or Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Create Account
              </Button>
            </Box>
          </form>

          {/* Error and Success Messages */}
          {error && (
            <Typography color="error" mt={2} align="center">
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" mt={2} align="center">
              {success}
            </Typography>
          )}
        </Box>

        {/* Right Section - Image */}
        <Box
          flex={1}
          display={{ xs: 'none', md: 'block' }}
          sx={{
            backgroundImage:
              'url(https://i.pinimg.com/736x/cc/85/04/cc8504a94ecd9b4343c3f6c5abbcda67.jpg)', // Replace with your image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Box>
    </Box>
  );
};

export default SingupPage;
