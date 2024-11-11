import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Add useParams for dynamic routing
import axios from "axios";

function ItemDetail() {
  const { id } = useParams(); // Get item ID from URL
  const navigate = useNavigate();

  const [item, setItem] = useState(null); // Store item data
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("41");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/item/items/${id}`
        );
        setItem(response.data);
        setSelectedImage(response.data.images[0]); // Default image
        setLoading(false);
      } catch (err) {
        setError("Failed to load item. Please try again later.");
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handlePlaceOrder = () => {
    navigate("/order-details", { state: { item, selectedSize } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Image Gallery */}
        <div>
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full rounded-lg shadow-md"
          />
          <div className="flex mt-4 space-x-4">
            {item.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Item Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
          <p className="text-gray-600 mb-4">{item.seller}</p>
          <p className="text-2xl font-semibold mb-6">
            IDR {item.price.toFixed(2)}
          </p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-medium text-lg mb-2">Size</h3>
            <div className="flex space-x-4">
              {["40", "41", "42", "43", "44"].map((size) => (
                <button
                  key={size}
                  className={`p-3 border rounded-lg ${
                    selectedSize === size
                      ? "bg-blue-600 text-white"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Place Order Button */}
          <button
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

          {/* Item Description */}
          <p className="mt-6 text-gray-700">{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
