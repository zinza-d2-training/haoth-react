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
  useGridSelector
} from '@mui/x-data-grid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ILocation } from '../../interfaces';
import { dataLocation } from '../../data/fake';
import { TransitionProps } from '@mui/material/transitions';
import { NewLocation } from '../../components/Create';
import { useAppSelector } from '../../app';
import { selectLocation } from '../../features/vaccine/locationSlice';

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
    width: 100,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'name',
    headerName: 'Tên điểm tiêm',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'street',
    headerName: 'Địa chỉ',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'leader',
    headerName: 'Người đứng đầu cơ sở tiêm chủng',
    type: 'string',
    minWidth: 350,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'table',
    headerName: 'Số bàn tiêm',
    type: 'number',
    headerAlign: 'center',
    align: 'center'
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
  street: string;
  leader: string;
  table: number;
}
const schema = yup
  .object({
    name: yup.string().required('Tên địa điểm không được để trống'),
    street: yup.string().required('Địa chỉ không được để trống'),
    leader: yup.string().required('Tên quản lí không được để trống'),
    table: yup
      .string()
      .required()
      .min(1, 'Bàn tiêm phải lớn hơn 0')
      .matches(/^[0-9]+$/, 'Bàn tiêm phải là dạng số ')
  })
  .required();
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Location = () => {
  const newLocation = useAppSelector(selectLocation);
  const [edit, setEdit] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [rowSelected, setRowSelected] = useState<Partial<ILocation>>();
  const [listData, setListData] = useState<ILocation[]>(dataLocation);
  const [open, setOpen] = React.useState<boolean>(false);
  const { register, handleSubmit, setValue,formState:{isValid,errors} } = useForm<IFormEdit>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  useEffect(() => {
    setValue('id', rowSelected?.id as number);
    setValue('name', rowSelected?.name as string);
    setValue('street', rowSelected?.street as string);
    setValue('leader', rowSelected?.leader as string);
    setValue('table', rowSelected?.table as number);
  }, [rowSelected, setValue]);
  useEffect(() => {
    if (newLocation) {
      setListData((prev) => [newLocation, ...prev]);
    }
  }, [newLocation]);
  useEffect(() => {
    if (location === '' && address === '') {
      setListData(dataLocation);
    }
  }, [location, address]);

  const handleClickOpen = (param: Partial<ILocation>) => {
    setRowSelected(param);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitSearch = () => {
    const res = dataLocation
      .filter((item) => {
        return item.name
          .toLocaleLowerCase()
          .includes(location.toLocaleLowerCase());
      })
      .filter((item) => {
        return item.street.includes(address);
      });
    setListData(res);
  };
  const onUpdateLocation: SubmitHandler<Partial<ILocation>> = (data) => {
    const result = listData.map((item) => {
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
      <NewLocation />
      <Container>
        <Row>
          <ComponentInput>
            <FormControl>
              <TextField
                onChange={(e: any) => setLocation(e.target.value as string)}
                size="small"
                placeholder="Điểm tiêm"
              />
            </FormControl>
          </ComponentInput>
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
              handleClickOpen(param.row as Partial<ILocation>)
            }
            autoPageSize
            autoHeight
            rows={listData}
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
              <Form onSubmit={handleSubmit(onUpdateLocation)}>
                <DialogContent>
                  <HeaderForm>
                    <Title>
                      <Typography variant="h6" component={'h6'}>
                        Cập Nhật Điểm Tiêm
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
                      <Typography>Tên điểm tiêm</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('name')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Địa chỉ</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.street}
                          helperText={errors.street?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('street')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Người đứng đầu cơ sở</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.leader}
                          helperText={errors.leader?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('leader')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Số bàn tiêm</Typography>
                      <FormControl fullWidth>
                        <TextField
                          error={!!errors.table}
                          helperText={errors.table?.message}
                          inputProps={{ readOnly: !edit }}
                          {...register('table')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                  </BodyForm>
                  {edit && (
                    <FooterForm>
                      <Cancel onClick={handleClose}>
                        <Typography fontWeight={500}>Hủy bỏ</Typography>
                      </Cancel>
                      <Save disabled={!isValid} type="submit">
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

export default Location;
