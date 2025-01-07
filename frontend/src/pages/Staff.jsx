import React, { useState, useEffect } from "react";
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
  Radio,
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

  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/staffs");
      setStaffData(response.data);
    } catch (error) {
      console.error("Error fetching staff data", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/staffs", formData);
      setStaffData([...staffData, response.data]);
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
      clearForm();
    } catch (error) {
      console.error("Error registering staff", error);
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
    } catch (error) {
      console.error("Error updating staff", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/staffs/${id}`);
      setStaffData(staffData.filter((staff) => staff._id !== id));
    } catch (error) {
      console.error("Error deleting staff", error);
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

  return (
    <div className="min-h-screen ">
      <Box p={4}>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Staff
        </Typography>

        <Box component="form" mb={4}>
          <Grid container spacing={2}>
            {[
              { label: "First Name", name: "firstName", type: "text", placeholder: "First name" },
              { label: "Email", name: "email", type: "email", placeholder: "Email" },
              { label: "Contact", name: "contact", type: "text", placeholder: "Contact" },
              { label: "Designation", name: "designation", type: "select", placeholder: "Designation", options: ["Manager", "Developer", "Designer"] },
              { label: "Role", name: "role", type: "select", placeholder: "Role", options: ["Admin", "User", "Editor"] },
              { label: "Address", name: "address", type: "text", placeholder: "Address" },
              { label: "Joined Date", name: "joinedDate", type: "date", placeholder: "Joined date" },
              { label: "Date of Birth", name: "dob", type: "date", placeholder: "Date of birth" },
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <label style={{ display: "block", marginBottom: "8px" }}>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      fontSize: "14px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                    }}
                  >
                    <option value="" disabled>
                      {field.placeholder}
                    </option>
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>
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
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      padding: "8px",
                      fontSize: "14px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                    }}
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <label style={{ display: "block", marginBottom: "8px" }}>Gender</label>
              <RadioGroup row value={formData.gender} onChange={handleGenderChange}>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Box display="flex" gap={2} mt={2}>
            <Button variant="contained"  onClick={handleRegister} sx={{ textTransform: "capitalize" }}>
              Register
            </Button>
            <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ textTransform: "capitalize" }}>
              Update
            </Button>
            <Button variant="outlined" onClick={clearForm} sx={{ textTransform: "capitalize" }}>
              Clear
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                {["First Name", "Email", "Contact", "Designation", "Role", "Address", "Gender", "Join Date", "Date of Birth", "Actions"].map((header) => (
                  <TableCell key={header} align="center" style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {staffData.map((staff, index) => (
                <TableRow key={staff._id} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
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
                    <IconButton color="primary" onClick={() => handleEdit(staff)} title="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(staff._id)} title="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default Staff;
