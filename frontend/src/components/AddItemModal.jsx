import { useState } from "react";
import axios from "axios";

function AddItemModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    weight: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:5000/item/items", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Item added successfully!");
      onClose(); // Close modal after success
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-black">Add New Item</h2>
        <form onSubmit={handleSubmit} className="text-black">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded text-black"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded text-black"
            required
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded text-black"
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (grams)"
            value={formData.weight}
            onChange={handleInputChange}
            className="w-full mb-4 p-2 border rounded text-black"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
