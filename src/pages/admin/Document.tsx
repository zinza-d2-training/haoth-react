import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Link,
  Pagination,
  PaginationItem,
  Slide,
  TextField,
  Typography
} from '@mui/material';
import { Close, Download, Edit, Search } from '@mui/icons-material';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IDocument, ILocation } from '../../interfaces';
import { listDocument } from '../../data/fake';
import { TransitionProps } from '@mui/material/transitions';
import { NewDocument } from '../../components/Create';
import { useAppSelector } from '../../app';
import { selectDocument } from '../../features/document/documentSlice';

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
    field: 'title',
    headerName: 'Tên tài liệu',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'download',
    headerName: 'Số lượt tải',
    type: 'number',
    minWidth: 350,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'link',
    headerName: 'Download',
    type: 'string',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: any) => {
      return (
        <Label>
          <Link href={params.row.link}>
            <Download />
          </Link>
        </Label>
      );
    }
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
  title: string;
  description: string;
  link: string;
  download: number;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Document = () => {
  const newDocument = useAppSelector(selectDocument);
  const [edit, setEdit] = useState<boolean>(false);
  const [titleDocument, setTitleDocument] = useState<string>('');
  const [rowSelected, setRowSelected] = useState<Partial<IDocument>>();
  const [listData, setListData] = useState<IDocument[]>(listDocument);
  const [open, setOpen] = React.useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm<IFormEdit>({
    mode: 'onChange'
  });
  useEffect(() => {
    if (newDocument) {
      setListData((prev) => [newDocument, ...prev]);
    }
  }, [newDocument]);
  useEffect(() => {
    setValue('id', rowSelected?.id as number);
    setValue('title', rowSelected?.title as string);
    setValue('description', rowSelected?.description as string);
    setValue('link', rowSelected?.link as string);
    setValue('download', rowSelected?.download as number);
  }, [rowSelected, setValue]);
  useEffect(() => {
    if (titleDocument === '') {
      setListData(listDocument);
    }
  }, [titleDocument]);

  const handleClickOpen = (param: Partial<IDocument>) => {
    setRowSelected(param);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmitSearch = () => {
    const res = listDocument.filter((item) => {
      return item.title
        .toLocaleLowerCase()
        .includes(titleDocument.toLocaleLowerCase());
    });
    setListData(res);
  };
  const onUpdateDocument: SubmitHandler<Partial<IDocument>> = (data) => {
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
      <NewDocument />
      <Container>
        <Row>
          <ComponentInput>
            <FormControl>
              <TextField
                onChange={(e: any) =>
                  setTitleDocument(e.target.value as string)
                }
                size="small"
                placeholder="Tên tài liệu"
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
              <Form onSubmit={handleSubmit(onUpdateDocument)}>
                <DialogContent>
                  <HeaderForm>
                    <Title>
                      <Typography variant="h6" component={'h6'}>
                        Cập nhật tài liệu
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
                      <Typography>Tên tài liệu</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: !edit }}
                          {...register('title')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Mô tả chi tiết</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: !edit }}
                          {...register('description')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>Số lượt tải</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: !edit }}
                          {...register('download')}
                          size="small"
                        />
                      </FormControl>
                    </Input>
                    <Input>
                      <Typography>URL</Typography>
                      <FormControl fullWidth>
                        <TextField
                          inputProps={{ readOnly: !edit }}
                          {...register('link')}
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

export default Document;
