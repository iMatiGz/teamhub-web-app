import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

const API_URL = import.meta.env.VITE_API_URL || null;

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetch(`${API_URL}/check-token`, 'GET', true);

  useEffect(() => {
    if (error?.status === 401) return navigate('/login');
  }, [data, error, isLoading]);

  return <>{!isLoading && !error && element}</>;
};
