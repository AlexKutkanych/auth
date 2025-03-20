import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../context/AuthContext';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import ProfilePage from '../../pages/ProfilePage';
import ProtectedRoute from '../../pages/ProtectedRoute';

export default function App() {
  const queryClient = new QueryClient();
  const isLoggedIn = false;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path='/profile'
              element={
                <ProtectedRoute user={isLoggedIn}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/sign-in'
              element={isLoggedIn ? <Navigate to='/' /> : <SignIn />}
            />
            <Route
              path='/sign-up'
              element={isLoggedIn ? <Navigate to='/' /> : <SignUp />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
