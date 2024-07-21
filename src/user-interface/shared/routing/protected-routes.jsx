import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { useUserStore } from '../../../hooks/contexts/useUserStore';

const API_URL = import.meta.env.VITE_API_URL || null;

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ element }) => {
  const deleteUserData = useUserStore(state => state.deleteUserData);
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetch(`${API_URL}/check-token`, 'GET', true);

  useEffect(() => {
    if (error?.status === 401) {
      deleteUserData();
      return navigate('/login');
    }
  }, [data, error, isLoading]);

  return <>{!isLoading && !error && element}</>;
};
