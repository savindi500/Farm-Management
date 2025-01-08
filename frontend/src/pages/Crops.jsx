import React, { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({ cropId: "", commonName: "", specificName: "", cropseason: "", image: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/crops");
      setCrops(response.data);
    } catch (error) {
      showSnackbar("Error fetching crops. Please try again.", "error");
    }
  };

  const handleAddCrop = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/crops", newCrop);
      setCrops([...crops, response.data]);
      setNewCrop({ cropId: "", commonName: "", specificName: "", cropseason: "", image: "" });
      showSnackbar("Crop added successfully!", "success");
    } catch (error) {
      showSnackbar("Error adding crop. Please try again.", "error");
    }
  };

  const handleUpdateCrop = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/crops/${newCrop.cropId}`, newCrop);
      setCrops(crops.map((crop) => (crop._id === newCrop.cropId ? response.data : crop)));
      setNewCrop({ cropId: "", commonName: "", specificName: "", cropseason: "", image: "" });
      showSnackbar("Crop updated successfully!", "success");
    } catch (error) {
      showSnackbar("Error updating crop. Please try again.", "error");
    }
  };

  const handleDeleteCrop = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/crops/${id}`);
      setCrops(crops.filter((crop) => crop._id !== id));
      showSnackbar("Crop deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Error deleting crop. Please try again.", "error");
    }
  };

  const handleEditCrop = (crop) => {
    setNewCrop({
      cropId: crop.cropId,
      commonName: crop.commonName,
      specificName: crop.specificName,
      cropseason: crop.cropseason,
      image: crop.image,
    });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Crop Management </h2>

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

        {/* Add/Update Crop Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[{ label: "Crop ID", value: newCrop.cropId, key: "cropId" },
            { label: "Common Name", value: newCrop.commonName, key: "commonName" },
            { label: "Specific Name", value: newCrop.specificName, key: "specificName" },
            { label: "Crop Season", value: newCrop.cropseason, key: "cropseason" },
            { label: "Image URL", value: newCrop.image, key: "image" },
          ].map(({ label, value, key }) => (
            <div key={key}>
              <label className="block text-gray-700 font-medium mb-2">{label}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setNewCrop({ ...newCrop, [key]: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-500"
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleAddCrop}
            className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-md"
          >
            Add Crop
          </button>
          {newCrop.cropId && (
            <button
              onClick={handleUpdateCrop}
              className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow-md"
            >
              Update Crop
            </button>
          )}
        </div>

        {/* Crops Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                {["Crop ID", "Common Name", "Specific Name", "Crop Season", "Image", "Actions"].map((header) => (
                  <th key={header} className="px-4 py-3 border-b border-gray-300 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop._id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-3 border-b border-gray-300">{crop.cropId}</td>
                  <td className="px-4 py-3 border-b border-gray-300">{crop.commonName}</td>
                  <td className="px-4 py-3 border-b border-gray-300">{crop.specificName}</td>
                  <td className="px-4 py-3 border-b border-gray-300">{crop.cropseason}</td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    {crop.image ? (
                      <img
                        src={crop.image}
                        alt={crop.commonName}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-500 italic">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEditCrop(crop)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCrop(crop._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Crops;
