import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EditItemModal from "../components/EditItemModal";

function ManageItems() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUserItems = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/item/user/items",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching user items:", error);
    }
  };

  useEffect(() => {
    fetchUserItems();
  }, []);

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSave = async (updatedItem) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/item/items/${updatedItem.id}`,
        updatedItem,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setShowModal(false);
      fetchUserItems(); // Refresh list after edit
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Your Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg shadow">
            <img
              src={item.images[0] || "/placeholder.png"}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-500">IDR {item.price.toFixed(2)}</p>
            <button
              onClick={() => handleEditClick(item)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Edit Item
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedItem && (
        <EditItemModal
          item={selectedItem}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default ManageItems;
