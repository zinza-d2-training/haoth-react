import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  Stack
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: block;
  position: relative;
  background-color: #ffffff;
  padding: 0;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
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
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 100px 24px 0; */
`;
const Header = styled.div`
  width: 100%;
  height: 42px;
  margin-bottom: 15px;
`;
const InputComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 15px;
`;
const Label = styled.label`
  margin-bottom: 8px;
`;
const Note = styled.span`
  color: red;
`;
const DialogActions = styled.div`
  width: 420px;
  display: flex;
  justify-content: flex-end;
`;

interface FormData {
  card: string;
  email: string;
  password: string;
  fullName: string;
  birthday: string;
  gender: string;
  province: string;
  district: string;
  ward: string;
}
interface Ward {
  code: number;
  name: string;
  codename: string;
  division_type: string;
  district_code: number;
}
interface District {
  code: number;
  wards?: Ward[];
  name: string;
  codename: string;
  division_type: string;
  province_code: number;
}
interface Province {
  code: number;
  districts?: District[];
  name: string;
  codename: string;
  division_type: string;
  phone_code: number;
}

const schema = yup
  .object({
    email: yup.string().required('Email là bắt buộc').email().trim(),
    password: yup
      .string()
      .min(8)
      .required('Mật khẩu dài ít nhất 8 kí tự')
      .trim(),
    fullName: yup.string().required('Tên không được để trống').trim(),
    birthday: yup.string().required().trim(),
    card: yup
      .string()
      .required('CCCD là bắt buộc')
      .matches(/^[0-9]+$/, 'CMND phải là dạng số ')
      .matches(/^(\d{9}|\d{12})$/, 'CMND chỉ chứa 9 hoặc 12 số'),
    gender: yup.string().required(),
    province: yup.string().required().trim(),
    district: yup.string().required().trim(),
    ward: yup.string().required().trim()
  })
  .required();

const Register = () => {
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      gender: 'Nam',
      birthday: Date(),
      province: '',
      district: '',
      ward: ''
    }
  });
  const province = watch('province');
  const district = watch('district');
  //Get Districts when select province
  useEffect(() => {
    const fetchData = () => {
      fetch('https://provinces.open-api.vn/api/', {
        method: 'GET',
        mode: 'cors'
      })
        .then((response) => response.json())
        .then((data) => setProvinces(data));
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!!province) {
      setDistricts([]);
      setWards([]);
      const code = province.split('/')[0];
      fetch(`https://provinces.open-api.vn/api/p/${code}/?depth=2`, {
        method: 'GET',
        mode: 'cors'
      })
        .then((response) => response.json())
        .then((data) => setDistricts(data.districts));
    }
  }, [province]);
  useEffect(() => {
    if (!!district) {
      const code = district.split('/')[0];
      fetch(`https://provinces.open-api.vn/api/d/${code}/?depth=2`, {
        method: 'GET',
        mode: 'cors'
      })
        .then((response) => response.json())
        .then((data) => setWards(data.wards));
    }
  }, [district]);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    data.province = data.province.split('/')[1];
    data.district = data.district.split('/')[1];
    const fetchRegister = async () => {
      await setTimeout(() => {
        alert('Dang ki thanh cong');
        navigate('/login');
      }, 2000);
    };
    fetchRegister();
  };
  return (
    <Wrapper>
      <Container>
        <SideLeft></SideLeft>
        <SideRight>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Header>
              <Typography
                sx={{
                  fontSize: '34px',
                  color: 'rgba(0, 0, 0, 0.87)',
                  fontWeight: 700
                }}
                variant="h4"
                component={'h4'}>
                Đăng ký tài khoản
              </Typography>
            </Header>
            <InputComponent>
              <Label>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fonSize: '16px',
                    fonWeight: '400'
                  }}>
                  CMND/CCCD <Note>(*)</Note>
                </Typography>
              </Label>
              <FormControl>
                <TextField
                  inputProps={{ style: { height: '33px' } }}
                  size="small"
                  {...register('card')}
                  error={!!errors.card}
                  helperText={errors.card?.message}
                  placeholder="CMND/CCCD"
                  sx={{ width: '400px' }}
                />
              </FormControl>
            </InputComponent>
            <InputComponent>
              <Label htmlFor="Email">
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fonSize: '16px',
                    fonWeight: '400'
                  }}>
                  Email <Note>(*)</Note>
                </Typography>
              </Label>
              <FormControl>
                <TextField
                  inputProps={{ style: { height: '33px' } }}
                  size="small"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  id="Email"
                  placeholder="email@example.com"
                  sx={{ width: '400px' }}
                />
              </FormControl>
            </InputComponent>
            <InputComponent>
              <Label htmlFor="password">
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fonSize: '16px',
                    fonWeight: '400'
                  }}>
                  Mật khẩu<Note>(*)</Note>
                </Typography>
              </Label>
              <FormControl>
                <TextField
                  inputProps={{ style: { height: '33px' } }}
                  size="small"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  id="password"
                  type="password"
                  placeholder="**********"
                  sx={{ width: '400px' }}
                />
              </FormControl>
            </InputComponent>
            <InputComponent>
              <Label htmlFor="fullName">
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fonSize: '16px',
                    fonWeight: '400'
                  }}>
                  Họ và tên <Note>(*)</Note>
                </Typography>
              </Label>
              <FormControl>
                <TextField
                  inputProps={{ style: { height: '33px' } }}
                  size="small"
                  {...register('fullName')}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  id="fullName"
                  placeholder="Ho va ten"
                  name="fullName"
                  sx={{ width: '400px' }}
                />
              </FormControl>
            </InputComponent>
            <InputComponent>
              <Label>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fonSize: '16px',
                    fonWeight: '400'
                  }}>
                  Ngày sinh <Note>(*)</Note>
                </Typography>
              </Label>
              <FormControl>
                <Controller
                  control={control}
                  {...register('birthday')}
                  render={({ field: { ref, onChange, value } }) => (
                    <Stack
                      sx={{
                        width: '400px',
                        height: '50px',
                        textAlign: 'left'
                      }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          InputProps={{
                            style: { height: '50px', boxSizing: 'border-box' }
                          }}
                          disableFuture
                          openTo="year"
                          views={['year', 'month', 'day']}
                          value={value || Date()}
                          onChange={(date) => {
                            onChange(date ? date : '');
                          }}
                          renderInput={(params) => {
                            return <TextField {...params} />;
                          }}
                        />
                      </LocalizationProvider>
                    </Stack>
                  )}
                />
              </FormControl>
            </InputComponent>
            <InputComponent>
              <Label htmlFor="gender">
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fonSize: '16px',
                    fonWeight: '400',
                    textAlign: 'left'
                  }}>
                  Giới tính <Note>(*)</Note>
                </Typography>
              </Label>
              <FormControl>
                <Controller
                  {...register('gender')}
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="gender"
                      sx={{ width: '400px', height: '50px', textAlign: 'left' }}
                      defaultValue={province}
                      {...field}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}>
                      <MenuItem value={'Nam'}>Nam</MenuItem>
                      <MenuItem value={'Nữ'}>Nữ</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </InputComponent>

            <InputComponent>
              <Label>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fonSize: '16px',
                    fonWeight: '400',
                    textAlign: 'left'
                  }}>
                  Tỉnh/Thành phố <Note>(*)</Note>
                </Typography>
              </Label>
              <FormControl>
                <Controller
                  {...register('province')}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      size="small"
                      id="province"
                      sx={{ width: '400px', height: '50px', textAlign: 'left' }}
                      defaultValue={province}
                      {...field}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}>
                      {provinces.map((province: Province) => (
                        <MenuItem
                          key={province.code}
                          value={`${province.code}/${province.name}`}>
                          {province.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </InputComponent>
            <InputComponent>
              <Label>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fonSize: '16px',
                    fonWeight: '400',
                    textAlign: 'left'
                  }}>
                  Quận/Huyện <Note>(*)</Note>
                </Typography>
              </Label>
              <FormControl>
                <Controller
                  {...register('district')}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      size="small"
                      id="district"
                      sx={{ width: '400px', height: '50px', textAlign: 'left' }}
                      defaultValue={district}
                      {...field}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}>
                      {districts.map((district: District) => (
                        <MenuItem
                          key={district.code}
                          value={`${district.code}/${district.name}`}>
                          {district.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </InputComponent>
            <InputComponent>
              <Label>
                <Typography
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)',
                    fonSize: '16px',
                    fonWeight: '400',
                    textAlign: 'left'
                  }}>
                  Xã/Phường <Note>(*)</Note>
                </Typography>
              </Label>
              <FormControl>
                <Controller
                  {...register('ward')}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Select
                      size="small"
                      id="ward"
                      sx={{ width: '400px', height: '50px', textAlign: 'left' }}
                      defaultValue={''}
                      {...field}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}>
                      {wards.map((ward: Ward) => (
                        <MenuItem key={ward.code} value={ward.name}>
                          {ward.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </InputComponent>
            <DialogActions>
              <Button
                disabled={!isValid}
                type="submit"
                sx={{ backgroundColor: '#FFFFFF' }}
                endIcon={<ArrowForward />}>
                <Typography sx={{ color: '#3F51B5', fontSize: '14px' }}>
                  Tiếp tục
                </Typography>
              </Button>
            </DialogActions>
          </Form>
        </SideRight>
      </Container>
    </Wrapper>
  );
};

export default Register;
