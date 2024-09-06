import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserDetail from "./components/UserDetail";
import Spinner from "./components/Spinner";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null); // Reset error state before new request
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later."); // Set the error message
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false); // Ensure loading is set to false in all cases
      }
    };

    fetchUsers();
  }, []);

  // Function to add a new user to the local state
  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Function to update an existing user in the local state
  const updateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  // Function to delete a user from the local state
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // Display the spinner while loading data
  if (loading) return <Spinner />;

  // Display the error message if there's an error
  if (error)
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  return (
    <Router>
      <nav className="flex justify-around bg-white border-gray-200 dark:bg-gray-900 p-5">
        <Link
          to="/"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-lg font-bold"
        >
          Home
        </Link>{" "}
        <Link
          to="/create"
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent  text-lg font-bold"
        >
          Create User
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<UserList users={users} deleteUser={deleteUser} />}
        />
        <Route path="/create" element={<UserForm addUser={addUser} />} />
        <Route
          path="/edit/:id"
          element={<UserForm isEdit={true} updateUser={updateUser} />}
        />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
