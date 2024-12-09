import { Member } from '@/types/member';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  member?: Member;
};

const NotAuthRoutes = ({ member }: Props) => {
  return member ? <Navigate to="/" /> : <Outlet />;
};

export default NotAuthRoutes;
