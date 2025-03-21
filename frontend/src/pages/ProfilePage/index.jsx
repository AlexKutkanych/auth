import React from 'react';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { useUserLogout } from '../../hooks/useUserLogout';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { auth } = useAuth();
  const { username, googleId } = auth?.user;
  const { handleLogout } = useUserLogout();

  return (
    <Stack spacing={2} direction={'row'} alignItems='center'>
      <Typography>Hello, {username}</Typography>
      <Button onClick={() => handleLogout(googleId)}>Logout</Button>
    </Stack>
  );
}
