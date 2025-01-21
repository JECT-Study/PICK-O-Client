import React from 'react';
import { PATH } from '@/constants/path';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isLoggedIn: boolean;
};

const ProtectedRoutes = ({ isLoggedIn }: Props) => {
  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default ProtectedRoutes;
