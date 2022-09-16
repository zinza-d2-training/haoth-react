import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import styled from '@emotion/styled';
import Login from './pages/login';
import ForgotPassword from './pages/forgot-password';
import Register from './pages/register/Register';
import { useAccessToken } from './hooks/useAccessToken';
import Homepage from './pages/homepage/Homepage';
import Layout from './layouts/Layout';
import {
  RegistrationOne,
  RegistrationTwo,
  RegistrationThree
} from './pages/vaccine-registration';
import { Account, Certification, ResultRegistration } from './pages/user';
import { Place } from './pages/admin';

const Wrapper = styled.div`
  overflow-x: hidden;
`;
function App() {
  const token = useAccessToken();
  return (
    <Wrapper>
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
          <Route
            path="/registration-step-1"
            element={
              <Layout>
                <RegistrationOne />
              </Layout>
            }
          />
          <Route
            path="/registration-step-2"
            element={
              <Layout>
                <RegistrationTwo />
              </Layout>
            }
          />
          <Route
            path="/registration-step-3"
            element={
              <Layout>
                <RegistrationThree />
              </Layout>
            }
          />
          <Route
            path="/user/certification"
            element={
              <Layout>
                <Certification />
              </Layout>
            }
          />
          <Route
            path="/user/result"
            element={
              <Layout>
                <ResultRegistration />
              </Layout>
            }
          />
          <Route
            path="/user/account"
            element={
              <Layout>
                <Account />
              </Layout>
            }
          />
          <Route
            path="/admin/place"
            element={
              <Layout>
                <Place />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;
