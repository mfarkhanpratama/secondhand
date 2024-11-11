import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import AddItemModal from "./AddItemModal"; // Import AddItemModal

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-customPrimary text-customText shadow-md relative">
      {/* First Row: Logo, Search Bar, and Profile Icon */}
      <div className="container mx-auto flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/secondhandlogo.jpg"
            alt="SecondHand Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Centered Search Bar */}
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-3 rounded-lg bg-gray-200 text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/favorites">
            <FaHeart className="h-6 w-6 stroke-3 stroke-black hover:text-gray-300" />
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="focus:outline-none"
              aria-expanded={isDropdownOpen}
            >
              <FaUserCircle className="h-8 w-8 stroke-3 stroke-black hover:text-gray-300" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                <button
                  onClick={openModal}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Jual Barang
                </button>
                <Link
                  to="/manage-items"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Manage Barang
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login"; // Redirect to login
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render AddItemModal */}
      {isModalOpen && <AddItemModal onClose={closeModal} />}
    </header>
  );
}

export default Header;
