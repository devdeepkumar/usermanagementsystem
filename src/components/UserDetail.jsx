import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching user details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>No user data</div>;

  return (
    <div className="">
      <h2 className="font-bold text-center text-2xl mt-5">User Details</h2>
      <div className="flex justify-center items-center p-6 rounded shadow-md">
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong> {user.website}
          </p>
          <p>
            <strong>Address:</strong> {user.address.street}, {user.address.city}
          </p>
          <p>
            <strong>Company:</strong> {user.company.name}
          </p>
          <Link
            className="font-bold bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 block mt-5"
            to={"/"}
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
