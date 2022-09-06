import React from 'react';
import styled from '@emotion/styled';
import Composite from '../../components/Composite/Composite';
import Chart from '../../components/Chart';
import Location from '../../components/Location';
const Wrapper = styled.div`
  width: 100vw;
  overflow-x: hidden;
`;
const Container = styled.div`
  box-sizing: border-box;
  overflow-x: hidden;
  width: 1440px;
  margin: 0 auto;
  padding: 0 36px;
  display: flex;
  flex-direction: column;
`;
const Homepage = () => {
  return (
    <Wrapper>
      <Composite />
      <Container>
        <Chart />
        <Location />
      </Container>
    </Wrapper>
  );
};

export default Homepage;
