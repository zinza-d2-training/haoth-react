import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div>
      ForgotPassword
      <Link to={'/login'}>Quay lai trang dang nhap</Link>
    </div>
  );
};

export default ForgotPassword;
