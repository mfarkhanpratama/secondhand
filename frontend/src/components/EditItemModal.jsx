import { useState } from "react";

function EditItemModal({ item, onClose, onSave }) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [weight, setWeight] = useState(item.weight);
  const [error, setError] = useState(""); // Untuk menampilkan pesan kesalahan

  const handleSubmit = () => {
    if (!name || !description || price <= 0 || weight <= 0) {
      setError("All fields are required and must have valid values.");
      return;
    }

    onSave({ id: item.id, name, description, price, weight });
    setError(""); // Reset error
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Item</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          placeholder="Weight"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="py-2 px-4 bg-gray-400 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditItemModal;
