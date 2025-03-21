import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!Object.keys(auth?.user).length) {
    return <Navigate to='/sign-up' replace />;
  }

  return children;
};

export default ProtectedRoute;
