import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleButton = ({ onSuccess }) => {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => {
        console.log('Login Failed');
      }}
      width={384}
    />
  );
};

export default GoogleButton;
