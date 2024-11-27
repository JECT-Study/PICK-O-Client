import React from 'react';
import { PATH } from '@/constants/path';
import { useTokenRefresh } from '@/hooks/common/useTokenRefresh';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isLoggedIn?: boolean;
};

const ProtectedRoutes = ({ isLoggedIn }: Props) => {
  useTokenRefresh();

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};

export default ProtectedRoutes;
