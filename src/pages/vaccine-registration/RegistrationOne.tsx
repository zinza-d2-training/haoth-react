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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IGroup, Shift } from '../../interfaces/interface';
import { axioInstance } from '../../utils/request/httpRequest';
import { format } from '../../utils/formatTime';

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
  insurranceCard: string;
  job: string;
  workPlace: string;
  address: string;
  time: Date;
  shiftName: string;
  shift: number;
  groupId: number;
}
const schema = yup
  .object({
    group: yup.string().required('Nh??m l?? b???t bu???c'),
    insurranceCard: yup
      .string()
      .required('BHYT l?? b???t bu???c')
      .matches(/^[0-9]+$/, 'BHYT ph???i l?? d???ng s??? ')
      .matches(/^(\d{10})$/, 'BHYT ch??? ch???a 10 s???'),
    job: yup.string().required('Ngh??? nghi???p l?? b???t bu???c'),
    workPlace: yup.string().required('N??i c??ng t??c l?? b???t bu???c'),
    address: yup.string().required('?????a ch??? l?? b???t bu???c'),
    time: yup.string().required(),
    shiftName: yup.string().required('Ca ti??m l?? b???t bu???c'),
    groupId: yup.number().required().min(1),
    shift: yup.number().required().min(0)
  })
  .required();
const shifts: Shift[] = [
  {
    id: 0,
    name: 'Bu???i s??ng'
  },
  {
    id: 1,
    name: 'Bu???i chi???u'
  },
  {
    id: 2,
    name: 'C??? ng??y'
  }
];
const RegistrationOne = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [groupSelect, setGroupSelecct] = useState<IGroup>();
  const [shiftSelect, setShiftSlect] = useState<Shift>();
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
      groupId: 0,
      insurranceCard: '',
      job: '',
      address: '',
      time: format(Date()),
      shiftName: 'C??? ng??y',
      shift: 2
    }
  });
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axioInstance.get<IGroup[]>('/groups');
        setGroups(res.data);
      } catch (error) {
        throw new Error();
      }
    };
    fetchGroup();
  }, []);
  useEffect(() => {
    if (groupSelect) {
      setValue('groupId', groupSelect.id);
      setValue('group', groupSelect.name);
    }
  }, [groupSelect, setValue]);
  useEffect(() => {
    if (shiftSelect) {
      setValue('shiftName', shiftSelect.name);
      setValue('shift', shiftSelect.id);
    }
  }, [shiftSelect, setValue]);
  const onSubmit: SubmitHandler<IFormData> = (data) => {
    const { group, shiftName, ...rest } = data;
    setTimeout(() => {
      navigate('/registration-step-2', {
        state: { data: rest }
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
                  1.Th??ng tin ng?????i ????ng k?? ti??m
                </Typography>
              </Header>
              <Row>
                <InputComponent>
                  <Title>Nh??m ??u ti??n</Title>
                  <Autocomplete
                    sx={{ width: '100%' }}
                    disablePortal
                    options={groups}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) =>
                      setGroupSelecct(value as IGroup)
                    }
                    renderInput={(params) => (
                      <TextField
                        error={!!errors.group}
                        helperText={errors.group?.message}
                        {...params}
                        size="small"
                        {...register('group')}
                        placeholder="Nh??m ??u ti??n"
                      />
                    )}
                  />
                </InputComponent>
                <InputComponent>
                  <Title>S??? th??? b???o hi???m y t???</Title>
                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      error={!!errors.insurranceCard}
                      helperText={errors.insurranceCard?.message}
                      size="small"
                      {...register('insurranceCard')}
                      placeholder="S??? th??? b???o hi???m y t???"
                    />
                  </FormControl>
                </InputComponent>
              </Row>
              <Row>
                <InputComponent>
                  <Title>Ngh??? nghi???p</Title>
                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      error={!!errors.job}
                      helperText={errors.job?.message}
                      size="small"
                      {...register('job')}
                      placeholder="Ngh??? nghi???p"
                    />
                  </FormControl>
                </InputComponent>
                <InputComponent>
                  <Title>????n v??? c??ng t??c</Title>
                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      error={!!errors.workPlace}
                      helperText={errors.workPlace?.message}
                      size="small"
                      {...register('workPlace')}
                      placeholder="????n v??? c??ng t??c"
                    />
                  </FormControl>
                </InputComponent>
                <InputComponent>
                  <Title>?????a ch??? hi???n t???i</Title>
                  <FormControl sx={{ width: '100%' }}>
                    <TextField
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      size="small"
                      {...register('address')}
                      placeholder="?????a ch??? hi???n t???i"
                    />
                  </FormControl>
                </InputComponent>
              </Row>
            </InfoInput>
            <InfoInput>
              <Header>
                <Typography align="left">
                  2.Th??ng tin ????ng k?? ti??m ch???ng
                </Typography>
              </Header>
              <Row>
                <InputComponent>
                  <Title>Ng??y mu???n ???????c ti??m (d??? ki???n)</Title>
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
                                field.onChange(date ? format(date) : null);
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
                  <Title>Bu???i ti??m mong mu???n</Title>
                  <Autocomplete
                    sx={{ width: '100%' }}
                    defaultValue={shifts[2]}
                    options={shifts}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => setShiftSlect(value as Shift)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        {...register('shiftName')}
                        helperText={errors.shiftName?.message}
                        error={!!errors.shiftName}
                        placeholder="B???n mu???n ti??m bu???i n??o?"
                      />
                    )}
                  />
                </InputComponent>
              </Row>
            </InfoInput>
            <Note>
              <Typography align="left">L??u ??</Typography>
              <List>
                <Item>
                  Vi???c ????ng k?? th??ng tin ho??n to??n b???o m???t v?? ph???c v??? cho chi???n
                  d???ch ti??m ch???ng V???c xin COVID - 19
                </Item>
                <Item>
                  Xin vui l??ng ki???m tra k??? c??c th??ng tin b???t bu???c(VD: H??? v?? t??n,
                  Ng??y th??ng n??m sinh, S??? ??i???n tho???i, S??? CMND/CCCD/M?? ?????nh danh
                  c??ng d??n/HC ...)
                </Item>
                <Item>
                  B???ng vi???c nh???n n??t "X??c nh???n", b???n ho??n to??n hi???u v?? ?????ng ??
                  ch???u tr??ch nhi???m v???i c??c th??ng tin ???? cung c???p.
                </Item>
                <Item>
                  C?? nh??n/T??? ch???c ????ng k?? th??nh c??ng tr??n h??? th???ng s??? ???????c ????a
                  v??o danh s??ch ?????t ti??m. C?? s??? y t??? s??? th??ng b??o l???ch ti??m khi
                  c?? v???c xin v?? k??? ho???ch ti??m ???????c ph?? duy???t. Tr??n tr???ng c???m ??n!
                </Item>
              </List>
            </Note>
            <Submit>
              <Link style={{ textDecoration: 'none' }} to={'/'}>
                <Cancel startIcon={<ArrowBack />}>
                  <Typography sx={{ fontWeight: 500 }}>H???y b???</Typography>
                </Cancel>
              </Link>
              <Continue
                disabled={!isValid}
                type="submit"
                startIcon={<ArrowForward />}>
                <Typography sx={{ fontWeight: 500 }}>Ti???p t???c</Typography>
              </Continue>
            </Submit>
          </Form>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default RegistrationOne;
