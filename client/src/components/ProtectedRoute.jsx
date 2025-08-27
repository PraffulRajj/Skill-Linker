import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
        // Not logged in
        return <Navigate to="/login" />;
    }

    if (userInfo.role !== role) {
        // Logged in but wrong role, redirect to their correct dashboard
        if (userInfo.role === 'seeker') {
            return <Navigate to="/seeker-dashboard" />;
        } else {
            return <Navigate to="/provider-dashboard" />;
        }
    }

    return children;
};

export default ProtectedRoute;
