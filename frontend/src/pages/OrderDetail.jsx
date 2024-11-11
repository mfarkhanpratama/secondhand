import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getShippingCosts } from "../services/shippingService";
import { getUserAddress } from "../services/userService"; // New service for fetching user data

function OrderDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {}; // Order item passed from ItemDetail

  const [userAddress, setUserAddress] = useState({ street: "", city: "" }); // Default user address
  const [couriers] = useState(["jne", "pos", "tiki"]); // Available couriers
  const [selectedCourier, setSelectedCourier] = useState("jne"); // Default courier
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [totalCost, setTotalCost] = useState(item.price);

  const origin = "501"; // Example: Yogyakarta (city ID)
  const destination = "114"; // Will be dynamic based on user's address city code
  const weight = 1000; // Example weight in grams

  useEffect(() => {
    // Fetch user address on mount
    const fetchUserAddress = async () => {
      try {
        const address = await getUserAddress();
        setUserAddress(address);
      } catch (error) {
        console.error("Failed to fetch user address", error);
      }
    };

    fetchUserAddress();
  }, []);

  useEffect(() => {
    // Fetch shipping costs when courier or address changes
    const fetchShippingCosts = async () => {
      try {
        const results = await getShippingCosts(
          origin,
          destination,
          weight,
          selectedCourier
        );
        setShippingOptions(results[0].costs);
      } catch (error) {
        console.error("Failed to fetch shipping costs", error);
      }
    };

    fetchShippingCosts();
  }, [origin, destination, weight, selectedCourier]);

  const handleShippingSelect = (cost) => {
    setSelectedShipping(cost);
    setTotalCost(item.price + cost.value);
  };

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: { item, totalCost, shipping: selectedShipping },
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>

      {/* Shipping Address Section */}
      <div className="mb-6 border p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
        <p>{userAddress.street || "Loading street..."}</p>
        <p>{userAddress.city || "Loading city..."}</p>
      </div>

      {/* Order Items Section */}
      <div className="mb-6 border p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p>{item.name}</p>
        <p>Price: IDR {item.price.toFixed(2)}</p>
      </div>

      {/* Courier Selection */}
      <div className="mb-6 border p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Select Courier</h2>
        <select
          value={selectedCourier}
          onChange={(e) => setSelectedCourier(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          {couriers.map((courier, index) => (
            <option key={index} value={courier}>
              {courier.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Shipping Options Section */}
      <div className="mb-6 border p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Shipping Options</h2>
        {shippingOptions.length > 0 ? (
          shippingOptions.map((option, index) => (
            <div key={index} className="flex justify-between mb-2">
              <label>
                <input
                  type="radio"
                  name="shipping"
                  value={option.cost[0].value}
                  onChange={() => handleShippingSelect(option.cost[0])}
                />
                {`${option.service} - ${option.cost[0].etd} days`}
              </label>
              <p>IDR {option.cost[0].value.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>Loading shipping options...</p>
        )}
      </div>

      {/* Total and Payment */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Total: IDR {totalCost.toFixed(2)}</h2>
        <button
          onClick={handleProceedToPayment}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default OrderDetail;
