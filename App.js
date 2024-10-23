import React, { useState } from "react";
import './App.css'; // Import the CSS file here

const CrudApp = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    setError("");
  };

  // Add new user
  const addUser = () => {
    if (!newUser.name || !newUser.email) {
      setError("Both fields are required");
      return;
    }
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "" });
  };

  // Edit user
  const editUser = (index) => {
    setEditMode(true);
    setNewUser(users[index]);
    setEditIndex(index);
  };

  // Update user
  const updateUser = () => {
    if (!newUser.name || !newUser.email) {
      setError("Both fields are required");
      return;
    }
    const updatedUsers = users.map((user, index) =>
      index === editIndex ? newUser : user
    );
    setUsers(updatedUsers);
    setEditMode(false);
    setNewUser({ name: "", email: "" });
    setEditIndex(null);
  };

  // Delete user
  const deleteUser = (index) => {
    const filteredUsers = users.filter((_, i) => i !== index);
    setUsers(filteredUsers);
  };

  // Reset form
  const resetForm = () => {
    setNewUser({ name: "", email: "" });
    setEditMode(false);
    setError("");
  };

  // Filter and sort users
  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortAsc) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className="crud-app">
      <h2>{editMode ? "Edit User" : "Add User"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newUser.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={handleChange}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={editMode ? updateUser : addUser}>
        {editMode ? "Update" : "Add"}
      </button>
      <button onClick={resetForm} className="reset-btn">
        Reset
      </button>

      <h3>User List</h3>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setSortAsc(!sortAsc)}>
        {sortAsc ? "Sort Desc" : "Sort Asc"}
      </button>

      {filteredUsers.length > 0 ? (
        <ul>
          {filteredUsers.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}
              <div className="actions">
                <button onClick={() => editUser(index)}>Edit</button>
                <button onClick={() => deleteUser(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default CrudApp;
