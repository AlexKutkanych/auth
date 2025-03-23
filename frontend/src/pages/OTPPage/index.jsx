import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { verifyOTP } from '../../api/auth';
import { useAuthErrorHandler } from '../../hooks/useAuthErrorHandler';
import { useAuth } from '../../context/AuthContext';
import { MuiOtpInput } from 'mui-one-time-password-input';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function OTPPage() {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location?.state || {};

  const { handleSuccessLogin } = useAuth();
  const { errorMessage, authErrorHandler } = useAuthErrorHandler();

  const loginMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: handleSuccessLogin(navigate),
    onError: authErrorHandler,
  });

  const handleOtpChange = (value) => {
    setOtp(value);
    setOtpError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!otp || !validateOTPFormat()) {
      return;
    }
    const body = {
      email,
      password,
      otp,
    };

    loginMutation.mutate(body);
  };

  const handleCancel = () => navigate('/sign-in-otp');

  const validateOTPFormat = () => {
    const isValid = otp.length === 6 && !isNaN(otp);

    if (!isValid) {
      setOtpError('Please enter a correct OTP!');
    }
    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction='column' justifyContent='space-between'>
        <Card variant='outlined'>
          <Typography component='h3' variant='h4'>
            Enter your OTP
          </Typography>
          {errorMessage ? <Alert severity='error'>{errorMessage}</Alert> : null}
          {otpError ? <Alert severity='error'>{otpError}</Alert> : null}
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              rowGap: 6,
            }}
          >
            <MuiOtpInput value={otp} onChange={handleOtpChange} length={6} />
            <Stack sx={{ rowGap: 2 }}>
              <Button type='submit' fullWidth variant='contained'>
                Verify OTP
              </Button>
              <Button
                type='submit'
                fullWidth
                variant='outlined'
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
