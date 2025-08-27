import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

// Mock data for services
const mockServices = ["Fan Repair", "AC Service", "Plumber", "Electrician", "Laptop Repair", "RO Service"];

const SeekerDashboard = () => {
    const [myRequests, setMyRequests] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const fetchMyRequests = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/services/my-requests', config);
            setMyRequests(data);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        }
    };
    
    useEffect(() => {
        fetchMyRequests();

        // Listen for real-time updates
        socket.on('request_accepted', (updatedRequest) => {
            // Check if the update is for this seeker
            if (updatedRequest.seeker === userInfo._id) {
                 setMyRequests(prevRequests => 
                    prevRequests.map(req => req._id === updatedRequest._id ? updatedRequest : req)
                );
            }
        });

        return () => socket.off('request_accepted');
    }, [userInfo._id]);

    const handleRequestService = async (serviceType) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.post('http://localhost:5000/api/services/request', { serviceType }, config);
            // After request, refetch to show the new pending request
            fetchMyRequests();
        } catch (error) {
            console.error("Failed to create service request", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-bold text-secondary mb-2">Seeker Dashboard</h1>
            <p className="text-lg text-gray-600 mb-8">Welcome, {userInfo.name}! Request a service in 10 minutes.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Services Catalog */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-secondary mb-4">Available Services</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {mockServices.map(service => (
                            <button 
                                key={service}
                                onClick={() => handleRequestService(service)}
                                className="bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-700 transition duration-300 text-center"
                            >
                                {service}
                            </button>
                        ))}
                    </div>
                </div>

                {/* My Requests */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-secondary mb-4">My Requests</h2>
                    <div className="space-y-4">
                        {myRequests.length > 0 ? myRequests.map(req => (
                            <div key={req._id} className="p-4 border rounded-lg flex justify-between items-center">
                                <span className="font-semibold text-gray-800">{req.serviceType}</span>
                                <span className={`px-3 py-1 text-sm font-bold rounded-full text-white ${req.status === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                    {req.status}
                                </span>
                            </div>
                        )) : <p className="text-gray-500">You have no active requests.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeekerDashboard;