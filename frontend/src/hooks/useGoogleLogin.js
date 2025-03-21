import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { googleLoginUser } from '../api/auth';

export const useGoogleLogin = () => {
  const { handleSuccessLogin } = useAuth();
  const navigate = useNavigate();

  const googleLoginMutation = useMutation({
    mutationFn: googleLoginUser,
    onSuccess: handleSuccessLogin(navigate),
    onError: (err) => console.log(err, 'Error fetching login data'),
  });

  const handleGoogleLogin = (credentials) => {
    googleLoginMutation.mutate(credentials);
  };

  return { handleGoogleLogin };
};
