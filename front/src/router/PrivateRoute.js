import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyAuth } from '../utils/auth/verifyAuth';
import { isAuthenticated } from './auth';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();

  const isAuth = isAuthenticated()
  console.log("🚀 ~ PrivateRoute ~ isAuth:", isAuth)

  useEffect(() => {
    if (!isAuth) {
      verifyAuth(dispatch);
    }
  }, [dispatch, isAuth]);

  // Após a verificação, decide se exibe o conteúdo protegido ou redireciona
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
