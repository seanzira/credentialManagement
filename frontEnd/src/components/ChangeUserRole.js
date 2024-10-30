import React, { useState } from 'react';
import axios from 'axios';

const ChangeUserRole = ({ setMessage }) => {
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('normal');

    const handleChangeUserRole = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:3001/api/user/change-role/${userId}`, {
                role,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
            setUserId('');
            setRole('normal');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        }
    };

    return (
        <div>
            <h2>Change User Role</h2>
            <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
            <input type="text" placeholder="New Role" onChange={(e) => setRole(e.target.value)} />
            <button onClick={handleChangeUserRole}>Change Role</button>
        </div>
    );
};

export default ChangeUserRole;
