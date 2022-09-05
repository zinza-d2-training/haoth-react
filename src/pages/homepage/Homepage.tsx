import React from 'react';
import styled from '@emotion/styled';
import Composite from '../../components/Composite/Composite';
const Wrapper = styled.div`
  width: 100vw;
`;
const Container = styled.div`
  width: 1440px;
  background-color: red;
  margin: 0 auto;
  padding: 0 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
const Homepage = () => {
  return (
    <Wrapper>
      <Composite />
      <Container></Container>
    </Wrapper>
  );
};

export default Homepage;
