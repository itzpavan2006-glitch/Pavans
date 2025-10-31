import React, { useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://51ba6ce5167c.ngrok-free.app/api/products",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log("Fetched products:", response.data);
      setProducts(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <h1 className="text-3xl font-bold text-gray-800">Product Listing</h1>

      <button
        onClick={fetchProducts}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
      >
        {loading ? "Loading..." : "Get Products"}
      </button>

      {loading && (
        <div className="text-gray-500 font-medium mt-5">
          Loading product data...
        </div>
      )}

      {!loading && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 w-full justify-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow-md p-4 w-64 hover:shadow-lg transition"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name || "Unnamed Product"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                ₹{product.price || "N/A"}
              </p>
              <p className="text-sm text-gray-400">
                {product.category || "No category"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="bg-red-100 p-5 border rounded-md text-gray-600 mt-5">
            No products available
          </div>
        )
      )}
    </div>
  );
}

export default Products;
