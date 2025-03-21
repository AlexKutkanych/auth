import React, { createContext, useContext, useEffect, useState } from 'react';
import getFromLocalStorage from '../utils/getFromLocalStorage';

const initialUser = { hasToken: false, user: {} };

const AuthContext = createContext(initialUser);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialUser);

  const getUserFromLocalStorage = () => {
    const user = getFromLocalStorage('user') || {};

    setUser(user);
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const setUser = (user) => {
    setAuth((state) => ({
      ...state,
      user,
    }));
  };

  const handleSuccessLogin = (navigate) => (data) => {
    if (data?.status === 'ok') {
      setAuth((state) => ({
        ...state,
        user: data?.user,
        hasToken: data?.hasToken,
      }));
      localStorage.setItem('user', JSON.stringify(data?.user));
      navigate('/profile');
    }
  };

  const resetAuth = () => {
    setAuth(initialUser)
    localStorage.removeItem('user')
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        resetAuth,
        setUser,
        saveUser,
        handleSuccessLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
