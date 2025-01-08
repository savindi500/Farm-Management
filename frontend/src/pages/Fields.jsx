import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Card,
  CardContent,
  Snackbar,
  Alert,
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fields");
      setFieldsData(response.data);
    } catch (error) {
      console.error("Error fetching fields data", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/fields", formData);
      setFieldsData([...fieldsData, response.data]);
      resetForm();
      showSnackbar("Field added successfully!", "success");
    } catch (error) {
      console.error("Error registering field", error);
      showSnackbar("Error adding field!", "error");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/fields/${formData.fieldID}`, formData);
      setFieldsData(fieldsData.map((field) => (field.fieldID === formData.fieldID ? response.data : field)));
      resetForm();
      showSnackbar("Field updated successfully!", "success");
    } catch (error) {
      console.error("Error updating field:", error);
      showSnackbar("Error updating field!", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/fields/${id}`);
      setFieldsData(fieldsData.filter((field) => field._id !== id));
      showSnackbar("Field deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting field:", error);
      showSnackbar("Error deleting field!", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box className="min-h-screen" p={4}>
      <h2 className="text-2xl font-bold text-center mb-6">Field Management</h2>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {["fieldID", "fieldName", "xCoordinate", "yCoordinate", "size", "images"].map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  type={
                    ["xCoordinate", "yCoordinate", "size"].includes(field) ? "number" : "text"
                  }
                />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" gap={2} mt={3}>
            <Button
              variant="contained"
              color="success"
              onClick={handleRegister}
            >
              Add Field
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleUpdate}
            >
              Update Field
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={resetForm}
            >
              Clear
            </Button>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
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
                      style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
                      onClick={() => handleImageClick(field.images)}
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => setFormData({ ...field })}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(field._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Large view"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Fields;
