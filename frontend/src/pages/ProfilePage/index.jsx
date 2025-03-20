import React from 'react';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import { useUserLogout } from '../../hooks/useUserLogout';

export default function ProfilePage() {
  const user = 'Alex';

  const { handleLogout } = useUserLogout();

  return (
    <Stack spacing={2}>
      <Typography>Hello, {user}</Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </Stack>
  );
}
