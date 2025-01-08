import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio
  
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

function Staff() {
  const [formData, setFormData] = useState({
    _id: "",
    firstName: "",
    email: "",
    contact: "",
    designation: "",
    role: "",
    address: "",
    gender: "",
    joinedDate: "",
    dob: "",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [staffData, setStaffData] = useState([]);
  
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/staffs");
      setStaffData(response.data);
    } catch (error) {
      showSnackbar("Error fetching staff. Please try again.", "error");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/staffs", formData);
      setStaffData([...staffData, response.data]);
      clearForm();
      showSnackbar("Crop added successfully!", "success");
    } catch (error) {
      console.error("Error registering staff", error);
      showSnackbar("Error adding crop. Please try again.", "error");
    }
  };

  const handleUpdate = async () => {
    if (!formData._id) {
      alert("Please select a staff member to update.");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/staffs/${formData._id}`, formData);
      fetchStaff();
      clearForm();
      showSnackbar("Crop updated successfully!", "success");
    } catch (error) {
      console.error("Error updating staff", error);
      showSnackbar("Error updating crop. Please try again.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/staffs/${id}`);
      setStaffData(staffData.filter((staff) => staff._id !== id));
      showSnackbar("Crop updated successfully!", "success");
    } catch (error) {
      console.error("Error deleting staff", error);
      showSnackbar("Error updating crop. Please try again.", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleEdit = (staff) => {
    setFormData({ ...staff });
  };

  const clearForm = () => {
    setFormData({
      _id: "",
      firstName: "",
      email: "",
      contact: "",
      designation: "",
      role: "",
      address: "",
      gender: "",
      joinedDate: "",
      dob: "",
    });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="min-h-screen">
      <Box p={4}>
      <h2 className="text-2xl font-bold text-center mb-6">Staff Management</h2>


        <Box component="form" mb={4} p={3} bgcolor="#f9f9f9" borderRadius="8px">
          <Grid container spacing={2}>
            {[{ label: "First Name", name: "firstName", type: "text" }, { label: "Email", name: "email", type: "email" }, { label: "Contact", name: "contact", type: "text" }, { label: "Designation", name: "designation", type: "select", options: ["Field Supervisor", "Crop Specialist", "Laborer"] }, { label: "Role", name: "role", type: "select", options: ["Admin", "User", "Editor"] }, { label: "Address", name: "address", type: "text" }, { label: "Joined Date", name: "joinedDate", type: "date" }, { label: "Date of Birth", name: "dob", type: "date" }].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <Typography variant="body1" mb={1}>
                  {field.label}
                </Typography>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontSize: "16px",
                    }}
                  >
                    <option value="" disabled>
                      Select {field.label}
                    </option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field.label}`}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontSize: "16px",
                    }}
                  />
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Typography variant="body1" mb={1}>
                Gender
              </Typography>
              <RadioGroup row value={formData.gender} onChange={handleGenderChange}>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            <Button
              variant="contained"
              onClick={handleRegister}
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              sx={{
                backgroundColor: "green",
                color: "white",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Update
            </Button>
            <Button variant="outlined" onClick={clearForm}
             sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            }}>
              Clear
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["First Name", "Email", "Contact", "Designation", "Role", "Address", "Gender", "Join Date", "DOB", "Actions"].map(
                  (header) => (
                    <TableCell key={header} align="center" sx={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {staffData.map((staff) => (
                <TableRow key={staff._id}>
                  <TableCell align="center">{staff.firstName}</TableCell>
                  <TableCell align="center">{staff.email}</TableCell>
                  <TableCell align="center">{staff.contact}</TableCell>
                  <TableCell align="center">{staff.designation}</TableCell>
                  <TableCell align="center">{staff.role}</TableCell>
                  <TableCell align="center">{staff.address}</TableCell>
                  <TableCell align="center">{staff.gender}</TableCell>
                  <TableCell align="center">{new Date(staff.joinedDate).toLocaleDateString()}</TableCell>
                  <TableCell align="center">{new Date(staff.dob).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEdit(staff)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(staff._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

     {/* Snackbar Component */}
             <Snackbar
               open={snackbar.open}
               autoHideDuration={4000}
               onClose={closeSnackbar}
               anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
             >
               <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                 {snackbar.message}
               </Alert>
             </Snackbar>
    </div>
  );
}

export default Staff;
