import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import ProfilePage from '../../pages/ProfilePage';
import ProtectedRoute from '../../pages/ProtectedRoute';

export default function App() {
  const queryClient = new QueryClient();
  const { auth } = useAuth();

  const hasToken = auth?.hasToken;
  const isLoggedIn = hasToken && auth?.user?.email;

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/sign-in'
                element={isLoggedIn ? <Navigate to='/profile' /> : <SignIn />}
              />
              <Route
                path='/sign-up'
                element={isLoggedIn ? <Navigate to='/profile' /> : <SignUp />}
              />
            </Routes>
          </Router>
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
