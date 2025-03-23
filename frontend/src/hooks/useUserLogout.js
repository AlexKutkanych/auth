import React from 'react';
import { googleLogout } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { logoutUser } from '../api/auth';

export const useUserLogout = () => {
  const { resetAuth } = useAuth();
  const navigate = useNavigate();

  const logoutQuery = useQuery({
    queryKey: ['logout'],
    queryFn: logoutUser,
    enabled: false,
  });

  const handleSuccessLogout = () => {
    resetAuth();
    navigate('/sign-in');
  };

  const handleLogout = async (googleId) => {
    if (googleId) {
      googleLogout();
      handleSuccessLogout();
    } else {
      const res = await logoutQuery?.refetch();

      if (res?.isSuccess) {
        handleSuccessLogout();
      }
    }
  };

  return { handleLogout };
};
