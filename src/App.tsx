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
import Register from './pages/register/Register';
import { useAccessToken } from './hooks/useAccessToken';
import Homepage from './pages/homepage/Homepage';
import Layout from './layouts/Layout';
function App() {
  const token = useAccessToken();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={token === '' ? <Login /> : <Navigate to={'/'} />}
          />
          <Route
            path="/forgot-password"
            element={token === '' ? <ForgotPassword /> : <Navigate to={'/'} />}
          />
          <Route
            path="/register"
            element={token === '' ? <Register /> : <Navigate to={'/'} />}
          />
          <Route
            path="/home"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
