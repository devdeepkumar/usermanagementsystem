import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const UserForm = ({ isEdit = false, addUser, updateUser }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          const user = response.data;
          setName(user.name);
          setEmail(user.email);
          setPhone(user.phone);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching user details");
          setLoading(false);
        });
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, phone };

    if (isEdit && id) {
      setLoading(true);
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${id}`, userData)
        .then((response) => {
          updateUser(response.data);
          navigate("/");
        })
        .catch((error) => {
          setError("Error updating user");
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios
        .post("https://jsonplaceholder.typicode.com/users", userData)
        .then((response) => {
          addUser(response.data);
          navigate("/");
        })
        .catch((error) => {
          setError("Error creating user");
          setLoading(false);
        });
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="h-[100%] w-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-center font-bold text-2xl my-5">
          {isEdit ? "Edit User" : "Create User"}
        </h2>
        {/* <h2>Edit user</h2> */}
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <label className="font-bold">Name : </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="font-bold">Email : </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="font-bold">Phone : </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-5"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
