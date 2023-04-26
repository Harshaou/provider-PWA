import { Navigate } from 'react-router-dom';
import decode from 'jwt-decode';

export const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('x-auth-token');
  let isExpired = false;
  if (token) {
    const decodedToken = decode(token, { complete: true });
    if (Date.now() >= decodedToken.exp * 1000) isExpired = true;
  } else {
    isExpired = true;
  }
  return isExpired === true ? <Navigate to="/login" replace /> : children;
};
