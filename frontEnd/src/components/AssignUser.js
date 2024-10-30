import React, { useState } from 'react';
import axios from 'axios';

const AssignUser = ({ setMessage }) => {
    const [userId, setUserId] = useState('');
    const [divisionId, setDivisionId] = useState('');

    const handleAssignUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3001/api/user-assignment/assign-user', {
                userId,
                divisionId,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
            setUserId('');
            setDivisionId('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        }
    };

    return (
        <div>
            <h2>Assign User to Division</h2>
            <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
            <input type="text" placeholder="Division ID" onChange={(e) => setDivisionId(e.target.value)} />
            <button onClick={handleAssignUser}>Assign User</button>
        </div>
    );
};

export default AssignUser;
