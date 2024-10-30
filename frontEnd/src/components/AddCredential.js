import React, { useState } from 'react';
import axios from 'axios';

const AddCredential = ({ setMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [service, setService] = useState('');
    const [divisionId, setDivisionId] = useState('');

    const handleAddCredential = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3001/api/credential/add-credential', {
                username,
                password,
                service,
                divisionId,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
            setUsername('');
            setPassword('');
            setService('');
            setDivisionId('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        }
    };

    return (
        <div>
            <h2>Add Credential</h2>
            <input type="text" placeholder="Credential Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Credential Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Service" onChange={(e) => setService(e.target.value)} />
            <input type="text" placeholder="Division ID" onChange={(e) => setDivisionId(e.target.value)} />
            <button onClick={handleAddCredential}>Add Credential</button>
        </div>
    );
};

export default AddCredential;
