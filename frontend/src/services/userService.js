import axios from "axios";

export const getUserAddress = async () => {
  const token = localStorage.getItem("token"); // Ensure the user is authenticated
  const response = await axios.get("http://127.0.0.1:5000/user/address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Assuming your backend returns { street, city }
};
