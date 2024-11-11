import axios from "axios";

const API_URL = "http://127.0.0.1:5000/item"; // Update base URL if needed

export const fetchItemDetails = async (id) => {
  const response = await axios.get(`${API_URL}/items/${id}`);
  return response.data; // Assuming backend returns the item details in response
};

export const createItem = async (formData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(API_URL, formData, config);
};
