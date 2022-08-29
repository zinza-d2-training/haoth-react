import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
export function useAccessToken(value: any) {
  const [token, setToken] = useLocalStorage('token', '');
  useEffect(() => {
    if (value !== '') {
      setToken(value);
    }
  }, [value, setToken]);
  return token;
}
