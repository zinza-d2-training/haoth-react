import axios from 'axios';
const token = localStorage.getItem('token') || '';
export const axioInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});

export const axiosInstanceToken = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Authorization: `Bearer ${token}`
  }
});
