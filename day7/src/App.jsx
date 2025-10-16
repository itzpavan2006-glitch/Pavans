import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Users from "./pages/Users";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-6">
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <Link to="/users" className="hover:underline">
            Users
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
