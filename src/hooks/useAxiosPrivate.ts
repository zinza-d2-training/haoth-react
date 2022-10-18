import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { axiosInstanceToken } from '../utils/request/httpRequest';
import { useAccessToken } from './useAccessToken';

const useAxiosPrivate = () => {
  const token = useAccessToken();
  useEffect(() => {
    const requestIntercept = axiosInstanceToken.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          };
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosInstanceToken.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          prevRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosInstanceToken(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstanceToken.interceptors.request.eject(requestIntercept);
      axiosInstanceToken.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  return axiosInstanceToken;
};

export default useAxiosPrivate;
