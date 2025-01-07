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
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const Fields = () => {
  const [formData, setFormData] = useState({
    fieldID: "",
    fieldName: "",
    xCoordinate: "",
    yCoordinate: "",
    size: "",
    images: "",
  });

  const [fieldsData, setFieldsData] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignData, setAssignData] = useState({
    date: "",
    fieldID: "",
    staffMember: "",
  });
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    fetchFields();
    fetchStaffMembers();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fields");
      setFieldsData(response.data);
    } catch (error) {
      console.error("Error fetching fields data", error);
    }
  };

  const fetchStaffMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/staffs");
      setStaffMembers(response.data);
    } catch (error) {
      console.error("Error fetching staff data", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/fields", formData);
      setFieldsData([...fieldsData, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error registering field", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/fields/${formData.fieldID}`, formData);
      setFieldsData(fieldsData.map(field => field.fieldID === formData.fieldID ? response.data : field));
      resetForm();
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/fields/${id}`);
      setFieldsData(fieldsData.filter((field) => field._id !== id));
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (field) => {
    setFormData({ ...field });
  };

  const resetForm = () => {
    setFormData({
      fieldID: "",
      fieldName: "",
      xCoordinate: "",
      yCoordinate: "",
      size: "",
      images: "",
    });
  };

  const handleAssign = async () => {
    try {
      await axios.post("http://localhost:5000/api/assign", assignData);
      setIsAssignModalOpen(false);
      setAssignData({ date: "", fieldID: "", staffMember: "" });
    } catch (error) {
      console.error("Error assigning staff member", error);
    }
  };

  return (
    <div className="min-h-screen ">
      <Box p={4}>
        <Typography variant="h5" mb={3} fontWeight="bold">
          Field Management
        </Typography>

        <Box component="form" mb={4}>
          <Grid container spacing={2}>
            {[
              { label: "Field ID", name: "fieldID", type: "text", placeholder: "Field ID" },
              { label: "Field Name", name: "fieldName", type: "text", placeholder: "Field Name" },
              { label: "X Coordinate", name: "xCoordinate", type: "number", placeholder: "X Coordinate" },
              { label: "Y Coordinate", name: "yCoordinate", type: "number", placeholder: "Y Coordinate" },
              { label: "Field Size", name: "size", type: "number", placeholder: "Field Size" },
              { label: "Image URL", name: "images", type: "text", placeholder: "Image URL" },
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <label style={{ display: "block", marginBottom: "8px" }}>{field.label}</label>
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
              </Grid>
            ))}
          </Grid>

          <Box display="flex" gap={2} mt={2}>
            <button
              onClick={handleRegister}
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add New Field
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
            <button
              onClick={resetForm}
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Clear
            </button>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["Field ID", "Field Name", "X Coordinate", "Y Coordinate", "Size", "Image", "Actions"].map((header) => (
                  <TableCell key={header} align="center" style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldsData.map((field) => (
                <TableRow key={field._id}>
                  <TableCell align="center">{field.fieldID}</TableCell>
                  <TableCell align="center">{field.fieldName}</TableCell>
                  <TableCell align="center">{field.xCoordinate}</TableCell>
                  <TableCell align="center">{field.yCoordinate}</TableCell>
                  <TableCell align="center">{field.size}</TableCell>
                  <TableCell align="center">
                    {field.images ? (
                      <img
                        src={field.images}
                        alt={field.fieldName}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(field)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(field._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setIsAssignModalOpen(true);
                        setAssignData({ ...assignData, fieldID: field.fieldID });
                      }}
                    >
                      Assign Staff
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)}>
          <Box
            p={4}
            style={{
              backgroundColor: "#fff",
              margin: "auto",
              marginTop: "10%",
              width: "400px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" mb={3}>
              Assign Staff Member
            </Typography>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={assignData.date}
              onChange={(e) => setAssignData({ ...assignData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Field ID"
              fullWidth
              value={assignData.fieldID}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              select
              label="Staff Member"
              fullWidth
              value={assignData.staffMember}
              onChange={(e) => setAssignData({ ...assignData, staffMember: e.target.value })}
              sx={{ mb: 2 }}
            >
              {staffMembers.map((staff) => (
                <MenuItem key={staff.id} value={staff.id}>
                  {staff.firstName}
                </MenuItem>
              ))}
            </TextField>

            <Box display="flex" gap={2}>
              <Button variant="contained" color="primary" onClick={handleAssign}>
                Confirm
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setIsAssignModalOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default Fields;
