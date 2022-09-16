import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Pagination,
  PaginationItem,
  Slide,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Close, Edit, Search } from '@mui/icons-material';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridValueGetterParams
} from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IVaccineRegistrationInfo } from '../../interfaces';
import { listVaccineRegistration } from '../../data/fake';
import { TransitionProps } from '@mui/material/transitions';
import { fetchUser } from '../../features/user/userAPI';
import { formatDate } from '../../utils/formatTime';

const Wrapper = styled.div`
  margin-top: 42px;
  width: 100vw;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eeeeee;
`;
const Container = styled.div`
  border: 1px solid rgba(38, 56, 150, 0.14);
  max-width: 1440px;
  width: 100%;
  padding: 12px 12px 0;
  margin: 0 auto;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 50px;
`;
const ComponentInput = styled.div`
  box-sizing: border-box;
  margin-right: 16px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
`;
const ButtonSearch = styled(Button)`
  padding: 8px 16px;
  background: #171a88;
  border-radius: 8px 8px 8px 0px;
  color: #ffffff;
`;
const FormDialog = styled.div`
  width: 444px;
`;
const HeaderForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Label = styled.label`
  cursor: pointer;
  &:hover {
    padding: 0 2px;
    background: #d3d3d3;
    border-radius: 50%;
  }
`;
const BodyForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  box-sizing: border-box;
`;
const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
`;
const FooterForm = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Cancel = styled(Button)`
  padding: 6px 16px;
  border: 1px solid rgba(63, 81, 181, 0.5);
  color: #3f51b5;
  margin-right: 16px;
  border-radius: 8px 8px 8px 0;
`;
const Save = styled(Button)`
  padding: 6px 16px;
  background: #3f51b5;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 8px 8px 8px 0;
  color: #ffffff;
`;
const Hidden = styled.div`
  display: none;
`;
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'STT',
    width: 60,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'name',
    headerName: 'Họ và tên',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.infoUser.name
  },
  {
    field: 'birthday',
    headerName: 'Ngày sinh',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      formatDate(params.row.infoUser.birthday)
  },
  {
    field: 'cardInsurance',
    headerName: 'Số CMND/CCCD/Mã định danh công dân',
    type: 'string',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    type: 'string',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'time',
    headerName: 'Ngày đăng kí tiêm',
    minWidth: 200,
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => formatDate(params.row.time)
  },
  {
    field: 'shift',
    headerName: 'Buổi tiêm',
    type: 'string',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    type: 'string',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      params.row.status === 1 ? 'Thành công' : 'Thất bại'
  }
];
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="primary"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}
interface IFormEdit {
  id: number;
  name: string;
  birthday: string;
  cardInsurance: string;
  address: string;
  time: string;
  shift: string;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Register = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [rowSelected, setRowSelected] =
    useState<Partial<IVaccineRegistrationInfo>>();
  const [initData, setInitData] = useState<IVaccineRegistrationInfo[]>();
  const [listData, setListData] = useState<IVaccineRegistrationInfo[]>();
  const [open, setOpen] = React.useState<boolean>(false);
  const { watch, register, handleSubmit, setValue } = useForm<IFormEdit>({
    mode: 'onChange'
  });
  useEffect(() => {
    const res = listVaccineRegistration.map((item) => {
      const info = fetchUser(item?.userId);
      item = {
        ...item,
        infoUser: info
      };
      return item;
    }) as IVaccineRegistrationInfo[];
    setListData(res);
    setInitData(res);
  }, []);
  useEffect(() => {
    setValue('id', rowSelected?.id as number);
    setValue('name', rowSelected?.infoUser?.name as string);
    setValue('address', rowSelected?.address as string);
    setValue('cardInsurance', rowSelected?.cardInsurance as string);
    setValue('time', formatDate(rowSelected?.time as string) as string);
    setValue('birthday', formatDate(rowSelected?.infoUser?.birthday as string));
  }, [rowSelected, setValue]);
  useEffect(() => {
    if (initData) {
      if (name === '' && address === '') {
        setListData(initData);
      }
    }
  }, [name, address, initData]);

  const handleClickOpen = (param: Partial<IVaccineRegistrationInfo>) => {
    setRowSelected(param);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitSearch = () => {
    if (initData) {
      const res = initData
        .filter((item) => {
          return item.infoUser?.name?.includes(name);
        })
        .filter((item) => {
          return item.address.includes(address);
        });
      setListData(res);
    }
  };
  const onUpdateSubmit: SubmitHandler<Partial<IVaccineRegistrationInfo>> = (
    data
  ) => {
    const result = listData?.map((item) => {
      if (item.id === data.id) {
        item = {
          ...item,
          ...data
        };
      }
      return item;
    });
    setListData(result);
    setOpen(false);
  };
  return (
    <Wrapper>
      <Container>
        <Row>
          <ComponentInput>
            <FormControl>
              <TextField
                onChange={(e: any) => setAddress(e.target.value as string)}
                size="small"
                placeholder="Địa chỉ"
              />
            </FormControl>
          </ComponentInput>
          <ComponentInput>
            <FormControl>
              <TextField
                onChange={(e: any) => setName(e.target.value as string)}
                size="small"
                placeholder="Tên người đăng kí"
              />
            </FormControl>
          </ComponentInput>
          <ComponentInput>
            <ButtonSearch onClick={onSubmitSearch} startIcon={<Search />}>
              <Typography fontWeight={500}>Tìm kiếm</Typography>
            </ButtonSearch>
          </ComponentInput>
        </Row>
        <Divider />
        <Row>
          <DataGrid
            disableColumnMenu
            onRowClick={(param) =>
              handleClickOpen(param.row as Partial<IVaccineRegistrationInfo>)
            }
            autoPageSize
            autoHeight
            rows={listData || []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            pagination
            components={{ Pagination: CustomPagination }}
          />
        </Row>
        <Row>
          <FormDialog>
            <Dialog
              fullWidth
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description">
              <Form onSubmit={handleSubmit(onUpdateSubmit)}>
                <DialogContent>
                  <HeaderForm>
                    <Title>
                      <Typography variant="h6" component={'h6'}>
                        Cập Nhật Thông Tin
                      </Typography>
                      <Label onClick={() => setEdit(!edit)}>
                        <Edit />
                      </Label>
                    </Title>
                    <Label onClick={handleClose}>
                      <Close />
                    </Label>
                  </HeaderForm>
                  <Divider />
                  <BodyForm>
                    <Hidden>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: true }}
                          {...register('id')}
                          size="small"
                        />
                      </FormControl>
                    </Hidden>
                    <Input>
                      <Typography>Tên người đăng kí</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: true }}
                          {...register('name')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Ngày sinh</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: true }}
                          {...register('birthday')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Số CMND/CCCD</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: !edit }}
                          {...register('cardInsurance')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Địa chỉ</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: !edit }}
                          {...register('address')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Thời gian đăng kí</Typography>
                      <FormControl fullWidth>
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
                              readOnly={!edit}
                              disablePast
                              openTo="year"
                              views={['year', 'month', 'day']}
                              {...register('time')}
                              value={watch('time')}
                              onChange={(date: any) => {
                                setValue('time', date.$d);
                              }}
                              renderInput={(params: any) => {
                                return <TextField {...params} />;
                              }}
                            />
                          </LocalizationProvider>
                        </Stack>
                      </FormControl>
                    </Input>
                  </BodyForm>
                  {edit && (
                    <FooterForm>
                      <Cancel onClick={handleClose}>
                        <Typography fontWeight={500}>Hủy bỏ</Typography>
                      </Cancel>
                      <Save type="submit">
                        <Typography fontWeight={500}>Xác nhận</Typography>
                      </Save>
                    </FooterForm>
                  )}
                </DialogContent>
              </Form>
            </Dialog>
          </FormDialog>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Register;
