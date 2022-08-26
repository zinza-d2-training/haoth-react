import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CircularProgress,
  FormControl,
  TextField,
  Button,
  Typography
} from '@mui/material';
import styles from './Login.module.css';
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
const Login: React.FC = () => {
  const errorLogin = useAppSelector(selectError);
  const isFetching = useAppSelector(selectIsFetching);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(loginAsync(data));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sideLeft}></div>
        <div className={styles.sideRight}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.containerRight}>
            <div className={styles.header}>
              <Typography
                component="h4"
                variant="h4"
                className={styles.headerTitle}>
                Đăng nhập vào tài khoản
              </Typography>
            </div>
            <FormControl className={styles.form}>
              <div className={styles.inputComponent}>
                <label htmlFor="email" className={styles.typoInput}>
                  Email
                </label>
                <TextField
                  {...register('email', { required: true, maxLength: 20 })}
                  name="email"
                  id="email"
                  type="text"
                  placeholder="12345689"
                  className={styles.input}
                />
                <Typography component="span" className={styles.error}>
                  {errors.email?.message}
                </Typography>
              </div>
              <div className={styles.inputComponent}>
                <label
                  htmlFor="password"
                  id="password"
                  className={styles.typoInput}>
                  Mật khẩu
                </label>
                <TextField
                  {...register('password', {
                    pattern: /^[A-Za-z]+$/i,
                    minLength: 8
                  })}
                  name="password"
                  type="password"
                  placeholder="*********"
                  className={styles.input}
                />
                <Typography className={styles.error} component="span">
                  {errors.password?.message}
                </Typography>
              </div>
            </FormControl>
            <div className={styles.links}>
              <Link to="/forgot-password">
                <Typography className={styles.link} component="span">
                  Quên mật khẩu?
                </Typography>
              </Link>
            </div>
            {errorLogin && (
              <Typography className={styles.error}>
                Tài khoản hoặc mật khẩu không chính xác
              </Typography>
            )}
            <Button
              disabled={isFetching}
              type="submit"
              className={styles.btnLogin}>
              <Typography className={styles.textBtnLogin}>Đăng nhập</Typography>
            </Button>
            <div className={styles.Typo}>
              <Typography>Hoặc đăng kí tài khoản nếu chưa đăng kí</Typography>
            </div>
            <Button
              variant="outlined"
              color="success"
              className={styles.btnRegister}>
              <Typography className={styles.textRegister}>Đăng ký</Typography>
            </Button>
          </form>
        </div>
      </div>
      {isFetching && (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Login;
