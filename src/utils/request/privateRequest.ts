import axios from 'axios';

const token = localStorage.getItem('token') || '';
const userRequest = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const get = async (path: string, options = {}) => {
  const response = await userRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, options = {}) => {
  const response = await userRequest.post(path, options);
  return response.data;
};

export const patch = async (path: string, options = {}) => {
  const response = await userRequest.patch(path, options);
  return response.data;
};

export default userRequest;
