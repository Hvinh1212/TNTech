import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import "./users.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const submitEdit = async (userData) => {
    const response = await fetch(`http://localhost:5000/api/users/${userData.user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const updatedUser = await response.json();
    if (response.ok) {
      setUsers(users.map(user => user.user_id === updatedUser.user_id ? updatedUser : user));
      setShowModal(false);
    } else {
      console.error('Failed to update user', updatedUser);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (response.ok) {
          setUsers(users.filter(user => user.id !== userId));
        } else {
          // Assuming the server might return a JSON with an error message
          const errorData = await response.json();
          console.error('Failed to delete user:', errorData.message || 'Unknown error');
          alert('Failed to delete user: ' + (errorData.message || 'Unknown error'));  // Alert or handle this message in a user-friendly way
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error: Could not delete user');
      }
    }
  };

  // get all users from database
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Filter users to include only those with role_id = 1
        const filteredUsers = data;
        setUsers(filteredUsers);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Simple modal for editing users
  const UserEditModal = () => {
    // Initialize local state to hold form values
    const [localEditingUser, setLocalEditingUser] = useState(editingUser);

    useEffect(() => {
      // Sync local form state with global state when editingUser changes
      setLocalEditingUser(editingUser);
    }, [editingUser]);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setLocalEditingUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      submitEdit(localEditingUser);
      setShowModal(false);  // Close modal on successful submit
    };

    return (
      <div style={{ display: showModal ? "block" : "none", position: "fixed", left: "30%", top: "30%", backgroundColor: "white", padding: "20px", zIndex: 100 }}>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={localEditingUser?.user_name} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={localEditingUser?.user_email} onChange={handleInputChange} />
          </label>
          <label>
            Phone:
            <input type="text" name="phone_number" value={localEditingUser?.user_phone} onChange={handleInputChange} />
          </label>
          <button type="submit">Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </form>
      </div>
    );
  };

  return (
    <div className="users">
      <Sidebar />
      <div className="userContainer">
        <h1>USERS MANAGEMENT</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>{user.user_phone}</td>
                <td>
                  <button onClick={() => handleDelete(user.user_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && <UserEditModal />}
      </div>
    </div>
  );
}

export default Users;
