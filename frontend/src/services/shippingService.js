import axios from "axios";

export const getShippingCosts = async (
  origin,
  destination,
  weight,
  courier
) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/shipping/calculate-shipping",
      {
        origin,
        destination,
        weight,
        courier,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include JWT token
        },
      }
    );
    return response.data; // Return the calculated shipping results
  } catch (error) {
    console.error("Error fetching shipping costs:", error);
    throw error;
  }
};
