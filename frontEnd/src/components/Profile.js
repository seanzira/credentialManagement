const React = require('react');
const { useEffect, useState } = require('react');
const axios = require('axios');
const { useMessage } = require('../components/SetMessage');

const Profile = () => {
    const { setMessage } = useMessage(); // Access setMessage from context
    const [User, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data); // Directly set user data
                setLoading(false);
            } catch (error) {
                setMessage(error.response?.data?.message || 'Error fetching profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [setMessage]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!User) {
        return <div>No profile data available.</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Username:</strong> {User.username}</p>
            <p><strong>Role:</strong> {User.role}</p>
            <p><strong>OU ID:</strong> {User.OU._id}</p>
        </div>
    );
};

export default Profile;
