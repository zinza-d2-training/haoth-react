import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app';
import { selectIsAdmin } from '../features/auth/authSlice';

import { useLogin } from '../hooks/useLogin';
import UnAuthorized from './UnAuthorized';

const RequireAdmin = () => {
  const isAdmin = useAppSelector(selectIsAdmin);
  const isLogin: boolean = useLogin();
  const location = useLocation();
  return isAdmin ? (
    <Outlet />
  ) : isLogin ? (
    <UnAuthorized />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};

export default RequireAdmin;
