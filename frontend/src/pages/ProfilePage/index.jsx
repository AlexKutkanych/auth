import React from 'react';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { useUserLogout } from '../../hooks/useUserLogout';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { auth } = useAuth();
  const { username, googleId, role } = auth?.user;
  const { handleLogout } = useUserLogout();

  return (
    <Stack spacing={2} alignItems='center'>
      <Typography>Hello, {username}</Typography>
      <Typography>Role: {role}</Typography>
      {googleId ? <Typography>Google ID {googleId}</Typography> : null}
      <Button onClick={() => handleLogout(googleId)}>Logout</Button>
    </Stack>
  );
}
