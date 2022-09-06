import React from 'react';
import styled from '@emotion/styled';
import {
  Autocomplete,
  FormControl,
  Pagination,
  PaginationItem,
  TextField,
  Typography
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Search } from '@mui/icons-material';
import { dataLocation } from '../../data/fake';
interface IFormData {
  province: string;
  district: string;
  ward: string;
}

const Wrapper = styled.div`
  margin: 20px 0px;
  padding: 15px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid rgba(38, 56, 150, 0.14);
  box-shadow: 0px 4px 12px rgba(34, 41, 47, 0.12);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Title = styled.div``;
const SearchContainer = styled.div`
  margin: 10px;
  width: 100%;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  height: 637px;
  margin: 5px 0;
`;
const BtnSearch = styled(LoadingButton)`
  background: #171a88;
  width: 148px;
  height: inherit;
  padding: 8px 16px;
  color: #ffffff;
  border-radius: 8px 8px 8px 0px;
  &:hover {
    background: #171a88;
    color: #ffffff;
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: #eeeeee;
`;

const columns: GridColDef[] = [
  { field: 'id', headerName: 'STT', width: 50 },
  {
    field: 'name',
    headerName: 'Tên điểm tiêm',
    minWidth: 185,
    headerAlign: 'center'
  },
  {
    field: 'street',
    headerName: 'Số nhà, tên đường',
    minWidth: 185,
    headerAlign: 'center'
  },
  {
    field: 'ward',
    headerName: 'Xã/Phường',
    type: 'string',
    minWidth: 185,
    headerAlign: 'center'
  },
  {
    field: 'district',
    headerName: 'Quận/Huyện',
    minWidth: 185,
    headerAlign: 'center'
  },
  {
    field: 'province',
    headerName: 'Tỉnh/Thành phố',
    type: 'string',
    editable: true,
    minWidth: 185,
    headerAlign: 'center'
  },
  {
    field: 'leader',
    headerName: 'Người đứng đầu cơ sở tiêm chủng',
    type: 'string',
    minWidth: 185,
    headerAlign: 'center'
  },
  {
    field: 'table',
    headerName: 'Số bàn tiêm',
    type: 'number',
    headerAlign: 'center'
  }
];

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
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
const Location = () => {
  const { register, handleSubmit } = useForm<IFormData>({
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<IFormData> = (data) => {};
  return (
    <Wrapper>
      <Title>
        <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
          Tra cứu điểm tiêm theo địa bàn
        </Typography>
      </Title>
      <SearchContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 250, marginRight: '10px' }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register('province')}
                size="small"
                label="Tỉnh/Thành phố"
              />
            )}
          />
          <Autocomplete
            disablePortal
            options={top100Films}
            sx={{ width: 250, marginRight: '10px' }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register('district')}
                size="small"
                label="Quận/Huyện"
              />
            )}
          />
          <Autocomplete
            disablePortal
            options={top100Films}
            sx={{ width: 250, marginRight: '10px' }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register('ward')}
                size="small"
                label="Xã/Phường"
              />
            )}
          />
          <FormControl sx={{ marginRight: '10px', width: '20%' }}>
            <BtnSearch type="submit" startIcon={<Search />}>
              <Typography>Tìm kiếm</Typography>
            </BtnSearch>
          </FormControl>
        </Form>
      </SearchContainer>
      <Divider />
      <Container>
        <DataGrid
          rows={dataLocation}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          pagination
          components={{ Pagination: CustomPagination }}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Container>
    </Wrapper>
  );
};

export default Location;
