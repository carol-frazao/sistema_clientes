import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Client from '../pages/client/Clients';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../pages/misc/NotFoundPage';
import { isAuthenticated } from './auth';
import CreateAccount from '../pages/auth/CreateAccount';
import ResetPasswordPage from '../pages/auth/ResetPassword';

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    // Define o título da página com base na rota atual
    switch (location.pathname) {
      case '/login':
        document.title = 'Login';
        break;
      case '/clientes':
        document.title = 'Clientes';
        break;
      case '/redefinir-senha':
        document.title = 'Redefinir Senha';
        break;
      case '/registrar':
        document.title = 'Registrar';
        break
      default:
        document.title = 'Sistema Clientes';
    }
  }, [location]);

  return (
    <Routes>
      <Route 
        path="/login" 
        element={<Login />} 
      />
      <Route 
        path="/registrar" 
        element={<CreateAccount />} 
      />
      <Route
        path="/"
        element={isAuthenticated() ? <Navigate to="/clientes" /> : <Navigate to="/login" />}
      />
      <Route
        path="/clientes"
        element={
          <PrivateRoute>
            <Client />
          </PrivateRoute>
        }
      />
      <Route
        path="/redefinir-senha"
        element={
          <PrivateRoute>
            <ResetPasswordPage />
          </PrivateRoute>
        }
      />
      <Route 
        path="*" 
        element={
          <PrivateRoute>
            <NotFoundPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Router;
