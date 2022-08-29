import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Login from './pages/login';
import ForgotPassword from './pages/forgot-password';
import User from './pages/user';
import { useAppSelector } from './app';
import { selectToken } from './features/user/userSlice';
import Register from './pages/register';
import { useAccessToken } from './hooks/useAccessToken';
function App() {
  const tokenUser = useAppSelector(selectToken);
  const token = useAccessToken(tokenUser);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={token !== '' ? <User /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={tokenUser === '' ? <Login /> : <Navigate to={'/'} />}
          />
          <Route
            path="/forgot-password"
            element={token === '' ? <ForgotPassword /> : <Navigate to={'/'} />}
          />
          <Route
            path="/register"
            element={token === '' ? <Register /> : <Navigate to={'/'} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
