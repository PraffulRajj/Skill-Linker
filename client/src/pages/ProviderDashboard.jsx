import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ProviderDashboard = () => {
    const [availableRequests, setAvailableRequests] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchAvailableRequests = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/services/available', config);
            setAvailableRequests(data);
        } catch (error) {
            console.error("Failed to fetch available requests", error);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchAvailableRequests();

        // Join the pincode room to receive notifications
        if (userInfo.pincode) {
            socket.emit('join_pincode_room', userInfo.pincode);
        }

        // Listen for new requests
        socket.on('new_service_request', (newRequest) => {
            // Add new request to the list if it's for this provider's pincode
             setAvailableRequests(prevRequests => [newRequest, ...prevRequests]);
        });

        return () => {
            socket.off('new_service_request');
        };
    }, [userInfo.pincode]);

    const handleAcceptRequest = async (requestId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`http://localhost:5000/api/services/${requestId}/accept`, {}, config);
            // Remove the accepted request from the list
            setAvailableRequests(prev => prev.filter(req => req._id !== requestId));
        } catch (error) {
            console.error("Failed to accept request", error);
            alert(error.response?.data?.message || 'Could not accept request.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold text-secondary mb-2">Provider Dashboard</h1>
            <p className="text-lg text-gray-600 mb-8">Welcome, {userInfo.name}! Find jobs in your area.</p>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-secondary mb-4">Available Jobs</h2>
                <div className="space-y-4">
                    {availableRequests.length > 0 ? availableRequests.map(req => (
                        <div key={req._id} className="p-4 border rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-bold text-lg text-gray-800">{req.serviceType}</p>
                                <p className="text-sm text-gray-500">From: {req.seeker?.name || 'A Seeker'}</p>
                            </div>
                            <button 
                                onClick={() => handleAcceptRequest(req._id)}
                                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Accept
                            </button>
                        </div>
                    )) : <p className="text-gray-500">No available jobs in your pincode right now.</p>}
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
