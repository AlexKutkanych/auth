import React from 'react';
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

  const handleLogout = async () => {
    const res = await logoutQuery?.refetch();

    if (res?.isSuccess) {
      localStorage.removeItem('user');
      resetAuth();
      navigate('/');
    }
  };

  return { handleLogout };
};
