import axios from 'axios';
export const axioInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST
});
const TOKEN = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token') as string)
  : '';

export const axiosInstanceToken = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});
