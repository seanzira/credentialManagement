import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; 
import { useMessage } from '../components/SetMessage'; 

const Login = () => {
    const { login } = useAuth(); 
    const { setMessage } = useMessage(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/user/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token); // Store token
            login(); // Update authentication state
            setMessage('Login successful!'); // Set success message
        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
