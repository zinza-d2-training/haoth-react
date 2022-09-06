import React from 'react';
import styled from '@emotion/styled';
import { Logo as imgLogo } from '../../assets/images';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../hooks';
import CustomizedMenus from './Dropdown';
const Wrapper = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 15px 0;
  box-sizing: border-box;
  background: linear-gradient(90deg, #ed1b23 0%, #2e3091 52.08%, #253494 100%);
`;
const Container = styled.div`
  width: 1440px;
  height: 50px;
  margin: 0 auto;
  padding: 0 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
const Branch = styled.div`
  width: 435px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Image = styled.img`
  width: 42px;
  height: 100%;
  object-fit: cover;
`;
const Menu = styled.ul`
  width: 524px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style-type: none;
`;
const LinkHeader = styled(Link)`
  margin: 0 2px;
  padding: 0px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  color: white;
  cursor: pointer;
  text-decoration: none;
`;
const MenuItem = styled(Button)`
  margin: 0 2px;
  padding: 0px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  color: white;
  cursor: pointer;
  text-decoration: none;
  text-transform: none;
`;
const ButtonLogin = styled(Button)`
  border-radius: 8px 8px 8px 0;
  background-color: white;
  padding: 8px 22px;
  color: #303f9f;
  border: 2px solid #ffffff;
  &:hover {
    color: white;
  }
`;
const TitleBtn = styled.span`
  /* color: #303F9F; */
  font-weight: 500;
  letter-spacing: -0.04px;
  font-size: 16px;
  &:hover {
    color: white;
  }
`;

const Header = () => {
  const [currentUser] = useLocalStorage('user', '');
  return (
    <Wrapper>
      <Container>
        <Branch>
          <Logo>
            <Image src={imgLogo} alt="Logo" />
            <Typography
              sx={{
                color: '#FFFFFF',
                fontWeight: 400,
                fontSize: '20px',
                marginLeft: '20px'
              }}
              component="h6"
              variant="h6">
              Cổng thông tin tiêm chủng covid-19
            </Typography>
          </Logo>
        </Branch>
        <Menu>
          <LinkHeader to={'/home'}>
            <Typography sx={{ fontWeight: '500' }}>Trang chủ</Typography>
          </LinkHeader>
          <LinkHeader to={'/home'}>
            <Typography sx={{ fontWeight: '500' }}>Đăng kí tiêm</Typography>
          </LinkHeader>
          <CustomizedMenus />
          {!!currentUser ? (
            <MenuItem>{currentUser?.email}</MenuItem>
          ) : (
            <LinkHeader to={'/login'}>
              <ButtonLogin>
                <TitleBtn>Đăng nhập</TitleBtn>
              </ButtonLogin>
            </LinkHeader>
          )}
        </Menu>
      </Container>
    </Wrapper>
  );
};

export default Header;
