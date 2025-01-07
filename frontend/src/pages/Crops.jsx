import React, { useState, useEffect } from "react";
import axios from "axios";

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [newCrop, setNewCrop] = useState({ cropId: "", commonName: "", specificName: "", cropseason: "", image: "" });

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/crops");
      setCrops(response.data);
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  const handleAddCrop = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/crops", newCrop);
      setCrops([...crops, response.data]);
      setNewCrop({ cropId: "", commonName: "", specificName: "", cropseason: "", image: "" });
    } catch (error) {
      console.error("Error adding crop:", error);
    }
  };

  const handleUpdateCrop = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/crops/${newCrop.cropId}`, newCrop);
      setCrops(crops.map(crop => crop._id === newCrop.cropId ? response.data : crop));
      setNewCrop({ cropId: "", commonName: "", specificName: "", cropseason: "", image: "" });
    } catch (error) {
      console.error("Error updating crop:", error);
    }
  };

  const handleDeleteCrop = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/crops/${id}`);
      setCrops(crops.filter((crop) => crop._id !== id));
    } catch (error) {
      console.error("Error deleting crop:", error);
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

  return (
    <div className="min-h-screen bg-green-70">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Crops</h2>
          <div className="space-x-2">
            <button
              onClick={handleAddCrop}
              className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700"
              
            >
              Add New Crop
            </button>
            {newCrop.cropId && (
              <button
                onClick={handleUpdateCrop}
                className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Crop
              </button>
            )}
          </div>
        </div>

        {/* Add/Update Crop Form */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Crop ID</label>
            <input
              type="text"
              placeholder="Crop ID"
              value={newCrop.cropId}
              onChange={(e) => setNewCrop({ ...newCrop, cropId: e.target.value })}
              className="border px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Common Name</label>
            <input
              type="text"
              placeholder="Common Name"
              value={newCrop.commonName}
              onChange={(e) => setNewCrop({ ...newCrop, commonName: e.target.value })}
              className="border px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Specific Name</label>
            <input
              type="text"
              placeholder="Specific Name"
              value={newCrop.specificName}
              onChange={(e) => setNewCrop({ ...newCrop, specificName: e.target.value })}
              className="border px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Crop Season</label>
            <input
              type="text"
              placeholder="Crop Season"
              value={newCrop.cropseason}
              onChange={(e) => setNewCrop({ ...newCrop, cropseason: e.target.value })}
              className="border px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              placeholder="Image URL"
              value={newCrop.image}
              onChange={(e) => setNewCrop({ ...newCrop, image: e.target.value })}
              className="border px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* Crops Table */}
        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Crop ID</th>
                <th className="px-4 py-2">Common Name</th>
                <th className="px-4 py-2">Specific Name</th>
                <th className="px-4 py-2">Crop Season</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {crops.map((crop) => (
                <tr key={crop._id} className="border-t">
                  <td className="px-4 py-2">{crop.cropId}</td>
                  <td className="px-4 py-2">{crop.commonName}</td>
                  <td className="px-4 py-2">{crop.specificName}</td>
                  <td className="px-4 py-2">{crop.cropseason}</td>
                  <td className="px-4 py-2">
                    {crop.image ? (
                      <img src={crop.image} alt={crop.commonName} className="w-32 h-32 object-cover rounded" />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleDeleteCrop(crop._id)}
                      className="text-red-600 hover:underline"
                    >
                       Delete
                    </button>
                    <button
                      onClick={() => handleEditCrop(crop)}
                      className="text-blue-600 hover:underline"
                    >
                       Edit
                    </button>
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
