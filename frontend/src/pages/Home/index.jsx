import React from 'react';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';

export default function HomePage() {
  const user = 'Alex';

  const handleLogout = () => {};

  return (
    <Stack spacing={2}>
      <Typography>Hello, {user}</Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </Stack>
  );
}
