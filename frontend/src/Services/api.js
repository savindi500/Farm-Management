import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getCrops = () => axios.get(`${API_BASE_URL}/crops`);
export const addCrop = (cropData) => axios.post(`${API_BASE_URL}/crops`, cropData);
export const updateCrop = (id, cropData) => axios.put(`${API_BASE_URL}/crops/${id}`, cropData);
export const deleteCrop = (id) => axios.delete(`${API_BASE_URL}/crops/${id}`);

export const getFields = () => axios.get(`${API_BASE_URL}/fields`);
export const addField = (fieldData) => axios.post(`${API_BASE_URL}/fields`, fieldData);
export const updateField = (id, fieldData) => axios.put(`${API_BASE_URL}/fields/${id}`, fieldData);
export const deleteField = (id) => axios.delete(`${API_BASE_URL}/fields/${id}`);

export const getStaff = () => axios.get(`${API_BASE_URL}/staffs`);
export const addStaff = (staffData) => axios.post(`${API_BASE_URL}/staffs`, staffData);
export const updateStaff = (id, staffData) => axios.put(`${API_BASE_URL}/staffs/${id}`, staffData);
export const deleteStaff = (id) => axios.delete(`${API_BASE_URL}/staffs/${id}`);

export const addUser = (userData) => axios.post(`${API_BASE_URL}/users`, userData);
export const loginUser = (userData) => axios.post(`${API_BASE_URL}/users/login`, userData);