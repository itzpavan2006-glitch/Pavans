import React, { useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://51ba6ce5167c.ngrok-free.app/api/users",
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log("Fetched users:", response.data);
      setUsers(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <h1 className="text-3xl font-bold text-gray-800">User Listing</h1>

      <button
        onClick={fetchUsers}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
      >
        {loading ? "Loading..." : "Get Users"}
      </button>

      {loading && (
        <div className="text-gray-500 font-medium mt-5">
          Loading user data...
        </div>
      )}

      {!loading && users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 w-full justify-items-center">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white border rounded-lg shadow-md p-4 w-64 hover:shadow-lg transition"
            >
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name || "Unnamed User"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {user.role || "No role specified"}
              </p>
              <p className="text-sm text-gray-400">
                {user.address || "No address"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="bg-red-100 p-5 border rounded-md text-gray-600 mt-5">
            No users available
          </div>
        )
      )}
    </div>
  );
}

export default Users;
