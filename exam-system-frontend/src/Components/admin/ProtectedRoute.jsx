// Components/admin/ProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, errorElement, role, ...rest }) => {
  // Simulate authentication logic; replace with actual implementation
  const isAuthenticated = true; // Example: should come from context or state

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" />;
  }

  // Example role-based access control (replace with actual logic)
  if (role && role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
