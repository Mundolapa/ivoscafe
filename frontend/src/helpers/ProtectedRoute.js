import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, isAuthenticated, redirectPath }) => {
    if (isAuthenticated) {
        return Element;
    } else {
        return <Navigate to={redirectPath} replace />;
    }
};

export default ProtectedRoute;
