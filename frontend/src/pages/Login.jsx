import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Response:", response); // Log the response for debugging
      localStorage.setItem("token", response.data.access_token);
      alert("Login successful!");
      navigate("/items"); // Redirect to items page
    } catch (error) {
      console.error("Login failed:", error); // Log error details
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
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

        {/* Right Section: Login Form */}
        <div className="flex-1 p-12">
          <h2 className="text-4xl font-bold mb-8 text-center">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="Username or email"
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
            <div className="flex justify-between text-sm">
              <a href="#" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">or</p>
            <button
              type="button"
              className="mt-4 flex items-center justify-center w-full border rounded-lg p-4 hover:bg-gray-100 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                alt="Google"
                className="h-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>
          <p className="mt-6 text-sm text-center">
            Are you new?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Create an Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
