import React, { useEffect, useState } from 'react';
import { fetchUser } from '../../features/user/userAPI';
import { useLocalStorage } from '../../hooks';
import { InfoUser } from '../../features/user/userAPI';
const User: React.FC = () => {
  const [token] = useLocalStorage('token', '');
  const [user, setUser] = useState<InfoUser>({
    id: '',
    email: '',
    token: ''
  });
  useEffect(() => {
    setTimeout(() => {
      const res = fetchUser(token);
      setUser(res);
    }, 500);
  }, [token]);
  return <div>{user && <p>Email: {user.email}</p>}</div>;
};

export default User;
