import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Login from './pages/login';
import User from './pages/user';
import { useLocalStorage } from './hooks';
import { useAppSelector } from './app';
import { selectToken } from './features/user/userSlice';

function App() {
  const [token, setToken] = useLocalStorage('token', '');
  const tokenUser = useAppSelector(selectToken);
  useEffect(() => {
    if (tokenUser !== '') {
      setToken(tokenUser);
    }
  }, [tokenUser, setToken]);
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
