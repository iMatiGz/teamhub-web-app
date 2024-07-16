import { useEffect, useState } from 'react';
import { CustomFetchError } from '../utils/custom-error';

export const useFetch = (url, method, trigger, headers = {}, body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const executeFetch = async () => {
    setData(null);
    setError(null);
    setIsLoading(true);

    if (trigger) {
      try {
        const response = await fetch(url, {
          method: method,
          mode: 'cors',
          credentials: 'include',
          headers: headers,
          body: body && JSON.stringify(body),
        });

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new CustomFetchError(response.status, errorMsg);
        }
        if (response.status === 204) return;

        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof CustomFetchError)
          return setError({ status: error.statusCode, message: error.message });
        return setError({ status: 1, message: 'No se pudo conectar con el servidor.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    executeFetch();
  }, [url, trigger]);

  return { data, error, isLoading };
};
