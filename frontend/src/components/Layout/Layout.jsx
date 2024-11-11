import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Header />

      {/* Page content */}
      <main className="flex-grow container mx-auto p-4">
        <div className="max-w-6xl mx-auto">
          {" "}
          {/* Constraining content width */}
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
