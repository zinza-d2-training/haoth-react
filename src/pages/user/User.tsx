import React from 'react';
import { useLocalStorage } from '../../hooks';
const User = () => {
  const [currentUser] = useLocalStorage('user', '');
  return <div>{!!currentUser && <p>Email: {currentUser?.email}</p>}</div>;
};

export default User;
