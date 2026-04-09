import axios from "axios";

const API = axios.create({
  baseURL: "https://paradocs.onrender.com/api",
  // baseURL: "http://localhost:8000/api",
});

// Auth
export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);

// Resources
export const uploadResource = (formData, token) =>
  API.post("/resource/upload", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAllResources = () => API.get("/resource");
export const getResourceById = (id) => API.get(`/resource/${id}`);
export const likeResource = (id, token) =>
  API.post(`/resource/like/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
export const commentResource = (id, text, token) =>
  API.post(`/resource/comment/${id}`, { text }, { headers: { Authorization: `Bearer ${token}` } });

// New API functions
export const deleteResource = (id, token) =>
  API.delete(`/resource/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const updateResource = (id, data, token) =>
  API.put(`/resource/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

// Chat
export const chatWithResource = (hashcode, question) =>
  API.post("/chat", { hashcode, question });

export default API;
