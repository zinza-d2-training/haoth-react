import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const RequireAuth = () => {
  const isLogin: boolean = useLogin();
  const location = useLocation();
  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};

export default RequireAuth;
