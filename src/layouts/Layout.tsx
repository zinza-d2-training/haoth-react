import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styled from '@emotion/styled';

type MainProps = {
  children: React.ReactNode;
};
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  flex-direction: column;
`;
const Layout = (props: MainProps) => {
  return (
    <Wrapper>
      <Header />
      {props.children}
      <Footer />
    </Wrapper>
  );
};

export default Layout;
