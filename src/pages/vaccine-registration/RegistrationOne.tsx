import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import StepCheck from './StepCheck';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Heading from './Heading';

import { groups as listGroups, shifts } from '../../data/fake';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IGroup } from '../../interfaces';
const Wrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px - 256px);
`;
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 0 36px;
  box-sizing: border-box;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const InfoInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Header = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;
const Row = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const InputComponent = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0px 15px 15px 0px;
`;
const Note = styled.div`
  color: #d32f2f;
  margin: 15px 0 25px 0;
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  list-style-position: inside;
`;
const Item = styled.li`
  font-size: 14px;
  margin-bottom: 2px;
  text-align: left;
  width: 100%;
  word-wrap: break-word;
`;
const Submit = styled.div`
  width: 100%;
  margin-top: 25px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Cancel = styled(Button)`
  text-decoration: none;
  padding: 6px 16px;
  border: 1px solid #303f9f;
  border-radius: 8px 8px 8px 0px;
  color: #303f9f;
  margin-right: 16px;
`;
const Continue = styled(Button)`
  text-decoration: none;
  padding: 6px 32px;
  background: #303f9f;
  border-radius: 8px 8px 8px 0px;
  color: #ffffff;
  &:hover {
    background: #303f9f;
    color: #ffffff;
  }
`;
const Title = styled(Typography)`
  margin-bottom: 5px;
`;
interface IFormData {
  group: string;
  cardInsurance: string;
  job: string;
  workplace: string;
  address: string;
  time: string;
  shift: string;
}
const schema = yup
  .object({
    group: yup.string().required('Nhóm là bắt buộc'),
    cardInsurance: yup
      .string()
      .required('BHYT là bắt buộc')
      .matches(/^[0-9]+$/, 'BHYT phải là dạng số ')
      .matches(/^(\d{10})$/, 'BHYT chỉ chứa 10 số'),
    job: yup.string().required('Nghề nghiệp là bắt buộc'),
    workplace: yup.string().required('Nơi công tác là bắt buộc'),
    address: yup.string().required('Địa chỉ là bắt buộc'),
    time: yup.string().required(),
    shift: yup.string().required()
  })
  .required();
const RegistrationOne = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<IGroup[]>([]);
  useEffect(() => {
    setGroups(listGroups);
  }, []);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      group: '',
      cardInsurance: '',
      job: '',
      address: '',
      time: Date(),
      shift: 'Cả ngày'
    }
  });
  const onSubmit: SubmitHandler<IFormData> = (data) => {
    setTimeout(() => {
      navigate('/registration-step-2', {
        state: { data }
      });
    }, 1000);
  };
  return (
    <Wrapper>
      <Heading />
      <Container>
        <StepCheck currentStep={0} />
        <Box width={'100%'}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InfoInput>
              <Header>
                <Typography align="left">
                  1.Thông tin người đăng ký tiêm
                </Typography>
              </Header>
              <Row>
                <InputComponent>
                  <Title>Nhóm ưu tiên</Title>
                  <Autocomplete
                    sx={{ width: '100%' }}
                    disablePortal
                    options={groups}
                    onChange={(event, value) =>
                      setValue('group', value?.label as string)
                    }
                    renderInput={(params) => (
                      <TextField
                        error={!!errors.group}
                        helperText={errors.group?.message}
                        {...params}
                        size="small"
                        {...register('group')}
                        placeholder="Nhóm ưu tiên"
                      />
                    )}
                  />
                </InputComponent>
                <InputComponent>
                  <Title>Số thẻ bảo hiểm y tế</Title>
                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      error={!!errors.cardInsurance}
                      helperText={errors.cardInsurance?.message}
                      size="small"
                      {...register('cardInsurance')}
                      placeholder="Số thẻ bảo hiểm y tế"
                    />
                  </FormControl>
                </InputComponent>
              </Row>
              <Row>
                <InputComponent>
                  <Title>Nghề nghiệp</Title>
                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      error={!!errors.job}
                      helperText={errors.job?.message}
                      size="small"
                      {...register('job')}
                      placeholder="Nghề nghiệp"
                    />
                  </FormControl>
                </InputComponent>
                <InputComponent>
                  <Title>Đơn vị công tác</Title>
                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      error={!!errors.workplace}
                      helperText={errors.workplace?.message}
                      size="small"
                      {...register('workplace')}
                      placeholder="Đơn vị công tác"
                    />
                  </FormControl>
                </InputComponent>
                <InputComponent>
                  <Title>Địa chỉ hiện tại</Title>
                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      size="small"
                      {...register('address')}
                      placeholder="Địa chỉ hiện tại"
                    />
                  </FormControl>
                </InputComponent>
              </Row>
            </InfoInput>
            <InfoInput>
              <Header>
                <Typography align="left">
                  2.Thông tin đăng ký tiêm chủng
                </Typography>
              </Header>
              <Row>
                <InputComponent>
                  <Title>Ngày muốn được tiêm (dự kiến)</Title>
                  <FormControl sx={{ width: '100%' }}>
                    <Controller
                      control={control}
                      {...register('time')}
                      render={({ field }) => (
                        <Stack
                          sx={{
                            width: '100%',
                            textAlign: 'left'
                          }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              InputProps={{
                                size: 'small'
                              }}
                              disablePast
                              openTo="year"
                              views={['year', 'month', 'day']}
                              value={field.value || Date()}
                              onChange={(date: any) => {
                                field.onChange(date ? date : '');
                              }}
                              renderInput={(params: any) => {
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
                  <Title>Buổi tiêm mong muốn</Title>
                  <Autocomplete
                    defaultValue={shifts[2]}
                    sx={{ width: '100%' }}
                    options={shifts}
                    onChange={(event, value) =>
                      setValue('shift', value?.label as string)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        {...register('shift')}
                        error={!!errors.shift}
                        placeholder="Bạn muốn tiêm buổi nào?"
                      />
                    )}
                  />
                </InputComponent>
              </Row>
            </InfoInput>
            <Note>
              <Typography align="left">Lưu ý</Typography>
              <List>
                <Item>
                  Việc đăng ký thông tin hoàn toàn bảo mật và phục vụ cho chiến
                  dịch tiêm chủng Vắc xin COVID - 19
                </Item>
                <Item>
                  Xin vui lòng kiểm tra kỹ các thông tin bắt buộc(VD: Họ và tên,
                  Ngày tháng năm sinh, Số điện thoại, Số CMND/CCCD/Mã định danh
                  công dân/HC ...)
                </Item>
                <Item>
                  Bằng việc nhấn nút "Xác nhận", bạn hoàn toàn hiểu và đồng ý
                  chịu trách nhiệm với các thông tin đã cung cấp.
                </Item>
                <Item>
                  Cá nhân/Tổ chức đăng ký thành công trên hệ thống sẽ được đưa
                  vào danh sách đặt tiêm. Cơ sở y tế sẽ thông báo lịch tiêm khi
                  có vắc xin và kế hoạch tiêm được phê duyệt. Trân trọng cảm ơn!
                </Item>
              </List>
            </Note>
            <Submit>
              <Link style={{ textDecoration: 'none' }} to={'/'}>
                <Cancel startIcon={<ArrowBack />}>
                  <Typography sx={{ fontWeight: 500 }}>Hủy bỏ</Typography>
                </Cancel>
              </Link>
              <Continue
                disabled={!isValid}
                type="submit"
                startIcon={<ArrowForward />}>
                <Typography sx={{ fontWeight: 500 }}>Tiếp tục</Typography>
              </Continue>
            </Submit>
          </Form>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default RegistrationOne;
