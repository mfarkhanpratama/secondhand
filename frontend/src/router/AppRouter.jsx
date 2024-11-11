import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Items from "../pages/Items";
import Orders from "../pages/Orders";
import NotFound from "../pages/NotFound";
import ItemDetail from "../pages/ItemDetail";
import OrderDetail from "../pages/OrderDetail";
import Payment from "../pages/Payment";
import ManageItems from "../pages/ManageItems";

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}

// Usage in AppRouter
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="items" element={<Items />} />
          <Route path="orders" element={<Orders />} />
          <Route path="items/:id" element={<ItemDetail />} />
          <Route path="order-details" element={<OrderDetail />} />
          <Route path="payment" element={<Payment />} />
          <Route path="manage-items" element={<ManageItems />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
