import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app';
import {
  forgotPasswordAsync,
  selectLoading,
  selectState
} from '../../features/user/forgotPasswordSlice';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
};
const schema = yup
  .object({
    email: yup.string().required().email()
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
  width: 479px;
  min-height: 206px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 24px;
  order: 0;
`;
const Header = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
`;
const ComponentInput = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`;
const DialogActions = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0px;
`;
const To = styled(Link)`
  text-decoration: none;
`;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stateForgot = useAppSelector(selectState);
  const isLoading = useAppSelector(selectLoading);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(forgotPasswordAsync(data.email));
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };
  return (
    <Wrapper>
      <Container>
        <SideLeft></SideLeft>
        <SideRight>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Header>
              <Typography
                component="span"
                sx={{
                  padding: '0px 40px',
                  textAlign: 'center',
                  fontSize: '16px',
                  color: 'rgba(0, 0, 0, 0.87)'
                }}>
                Để khôi phục mật khẩu, vui lòng nhập đúng email bạn đã dùng để
                đăng kí <span style={{ color: '#E53935' }}>(*)</span>
              </Typography>
            </Header>
            <FormControl
              sx={{
                width: '100%',
                height: '50px',
                padding: 0
              }}>
              <ComponentInput>
                <TextField
                  inputProps={{ readOnly: isLoading }}
                  {...register('email')}
                  id="email"
                  type="text"
                  placeholder="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    width: '100%'
                  }}
                />
              </ComponentInput>
            </FormControl>
            {stateForgot.status === 'failed' && (
              <Typography sx={{ color: 'red', padding: '5px 0' }}>
                {stateForgot.message}
              </Typography>
            )}
            <DialogActions>
              <To to={'/login'}>
                <Button
                  variant="outlined"
                  sx={{
                    margin: '0 8px',
                    padding: '6px 16px',
                    border: '1px solid #303F9F',
                    borderRadius: '8px 8px 8px 0px',
                    gap: '4px'
                  }}>
                  <Typography component="span" sx={{ color: '#303F9F' }}>
                    Quay lại
                  </Typography>
                </Button>
              </To>
              <LoadingButton
                loading={isLoading}
                disabled={!isValid}
                type="submit"
                sx={{
                  margin: '0 8px',
                  padding: '6px 32px',
                  borderRadius: '8px 8px 8px 0px',
                  backgroundColor: '#303F9F'
                }}>
                <Typography sx={{ color: '#FFFFFF', fontWeight: '700' }}>
                  Gửi
                </Typography>
              </LoadingButton>
            </DialogActions>
          </Form>
        </SideRight>
      </Container>
    </Wrapper>
  );
};

export default ForgotPassword;
