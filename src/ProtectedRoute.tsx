import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext';

interface ProtectedRouteProps {
  element: ReactElement;
  role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, role }) => {
  const { getUserData } = useAuth();
  const user = getUserData();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
