import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});

export const get = async (path: string, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response.data;
};

export const patch = async (path: string, options = {}) => {
  const response = await httpRequest.patch(path, options);
  return response.data;
};

export default httpRequest;
