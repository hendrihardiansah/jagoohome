import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function login() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:3000/login')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className="Login">
      <header className="App-header">
        <h1>Users List</h1>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.username} - {user.password}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default {
    login
};