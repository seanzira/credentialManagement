import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; 
import { useMessage } from '../components/SetMessage';

const Register = () => {
    const { login } = useAuth(); // Use authentication context
    const { setMessage } = useMessage(); // Access setMessage from context
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('normal');
    const [ou, setOu] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/user/register', {
                username,
                password,
                role,
                ou,
            });
            localStorage.setItem('token', response.data.token); // Store token if needed
            login(); // Update authentication state
            setMessage(response.data.message); // Set success message
        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Role" onChange={(e) => setRole(e.target.value)} />
            <input type="text" placeholder="OU ID" onChange={(e) => setOu(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
