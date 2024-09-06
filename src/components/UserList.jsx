import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users, deleteUser }) => {
  return (
    <div className="flex justify-center">
      <div>
        <h1 className="text-center text-2xl font-bold m-5 uppercase">
          User Management System
        </h1>
        <table className="border-2 border-black m-5">
          <thead>
            <tr className="bg-slate-300">
              <th className="p-1 border-2 border-black">Name</th>
              <th className="p-1 border-2 border-black">Email</th>
              <th className="p-1 border-2 border-black">Phone</th>
              <th className="p-1 border-2 border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-1 border-2 border-black">{user.name}</td>
                <td className="p-1 border-2 border-black">{user.email}</td>
                <td className="p-1 border-2 border-black">{user.phone}</td>
                <td className="p-1 border-2 border-black">
                  <Link
                    className="text-green-500 font-bold"
                    to={`/users/${user.id}`}
                  >
                    Details
                  </Link>
                  |
                  <Link
                    className="text-blue-500 font-bold"
                    to={`/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  |
                  <button
                    className="text-red-500 font-bold"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
