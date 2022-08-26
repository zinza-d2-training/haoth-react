import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app';
import {
  loginAsync,
  selectError,
  selectIsFetching
} from '../../features/user/userSlice';

type FormData = {
  email: string;
  password: string;
};
const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().min(8).required().trim()
  })
  .required();

const Wrapper = styled.div`
  width: 100%;
  display: block;
  position: relative;
  background-color: #ffffff;
  padding: 0;
`;
const Container = styled.div`
  width: 1400px;
  height: 1000px;
  padding: 0;
  display: flex;
`;
const SideLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: url('http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRX350AtXwfAeOrD-nrzZT3TzGdBVplfiffUbY1MXtZkEvwhW4Wlcn6qF8-wNA59qpT5Gfie1sa0e719GqBW74');
  background-size: cover;
`;
const SideRight = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  width: 376px;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 24px;
  order: 0;
`;
const Header = styled.div`
  width: 100%;
  height: 42px;
  padding: 0;
`;
const Label = styled.label`
  text-align: start;
  width: 100%;
  height: 24px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.87);
`;
const ComponentInput = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const ForgotPassword = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const Typo = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.87);
`;
const Login: React.FC = () => {
  const errorLogin = useAppSelector(selectError);
  const isFetching = useAppSelector(selectIsFetching);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(loginAsync(data));
  };
  useEffect(() => {
    console.log(isValid);
  });
  return (
    <Wrapper>
      <Container>
        <SideLeft></SideLeft>
        <SideRight>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Header>
              <Typography
                component="h4"
                variant="h4"
                sx={{
                  textAlign: 'left',
                  fontWeight: '700'
                }}>
                Đăng nhập vào tài khoản
              </Typography>
            </Header>
            <FormControl
              sx={{
                width: '100%',
                minHeight: '174px',
                padding: 0
              }}>
              <ComponentInput>
                <Label htmlFor="email">Email</Label>
                <TextField
                  {...register('email')}
                  name="email"
                  id="email"
                  type="text"
                  placeholder="12345689"
                  sx={{
                    width: '100%'
                  }}
                />
                <ErrorMessage
                  style={{ color: 'red', padding: '5px 0' }}
                  errors={errors}
                  name="email"
                  as="p"
                />
              </ComponentInput>
              <ComponentInput>
                <Label htmlFor="password" id="password">
                  Mật khẩu
                </Label>
                <TextField
                  {...register('password')}
                  name="password"
                  type="password"
                  placeholder="*********"
                  sx={{ width: '100%' }}
                />
                <ErrorMessage
                  style={{ color: 'red', padding: '5px 0' }}
                  errors={errors}
                  name="password"
                  as="p"
                />
              </ComponentInput>
            </FormControl>
            <ForgotPassword>
              <Link style={{ textDecoration: 'none' }} to="/forgot-password">
                <Typography sx={{ color: '#3949AB' }} component="span">
                  Quên mật khẩu?
                </Typography>
              </Link>
            </ForgotPassword>
            {errorLogin && (
              <Typography sx={{ color: 'red', padding: '5px 0' }}>
                Tài khoản hoặc mật khẩu không chính xác
              </Typography>
            )}
            <LoadingButton
              loading={isFetching}
              disabled={!isValid}
              type="submit"
              sx={{ width: '376px', height: '50px', background: '#66BB6A' }}>
              <Typography sx={{ color: '#FFFFFF', fontWeight: '700' }}>
                Đăng nhập
              </Typography>
            </LoadingButton>
            <Typo>
              <Typography>Hoặc đăng kí tài khoản nếu chưa đăng kí</Typography>
            </Typo>
            <Button
              variant="outlined"
              color="success"
              sx={{
                border: '1px solid #9CCC65',
                width: '376px',
                height: '50px'
              }}>
              <Typography sx={{ color: '#9CCC65', fontWeight: '700' }}>
                Đăng ký
              </Typography>
            </Button>
          </Form>
        </SideRight>
      </Container>
    </Wrapper>
  );
};

export default Login;
