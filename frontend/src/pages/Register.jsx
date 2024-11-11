import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password, cityCode, street, postalCode);
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#758B96" }}
    >
      <div className="bg-white shadow-2xl rounded-xl flex w-full max-w-6xl transform transition hover:scale-105">
        {/* Left Section: Illustration */}
        <div className="hidden md:flex flex-1 bg-[#0B111C] p-12 items-center justify-center rounded-tl-xl rounded-bl-xl">
          <img
            src="/iluslogin.jpg" // Ensure the path matches your public folder setup
            alt="Illustration"
            className="w-full max-w-lg"
          />
        </div>

        {/* Right Section: Register Form */}
        <div className="flex-1 p-12">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Create Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="City Code"
              value={cityCode}
              onChange={(e) => setCityCode(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Street Address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
