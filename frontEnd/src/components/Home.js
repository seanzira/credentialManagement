import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>Welcome to the User Management System</h2>
            <h3>Select an option:</h3>
            <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/add-credential">Add Credential</Link></li>
                <li><Link to="/update-credential">Update Credential</Link></li>
                <li><Link to="/assign-user">Assign User</Link></li>
                <li><Link to="/change-role">Change User Role</Link></li>
            </ul>
        </div>
    );
};

export default Home;
