import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
    const { user, loading } = useContext(AuthContext); 

    if (loading) {
        return <div>Loading...</div>; 
    }
    if (!user || user.role !== 'admin') {
        return <Navigate to="/home" />;
    }

    return <Component />;
};

export default ProtectedRoute;
