import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {}; // Retrieve item details passed via state

  if (!item) {
    return <p>No payment details found.</p>;
  }

  const handlePayment = () => {
    alert(`Payment successful for ${item.name}!`);
    navigate("/items"); // Redirect back to Items Page after payment
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>
      <div className="border p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
        <p className="text-lg">Price: ${item.price.toFixed(2)}</p>
      </div>
      <button
        onClick={handlePayment}
        className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition"
      >
        Confirm Payment
      </button>
    </div>
  );
}

export default Payment;
