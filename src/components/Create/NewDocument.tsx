import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Close, NoteAdd } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Typography,
  Dialog,
  DialogContent,
  Slide,
  Button,
  FormControl,
  TextField
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { fetchCreateDocument } from '../../features/document/documentSlice';
import { useAppDispatch } from '../../app';
const Wrapper = styled.div`
  width: 100%;
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eeeeee;
`;
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;
const Form = styled.form``;
const FormDialog = styled.div`
  width: 50%;
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface IFormData {
  title: string;
  description: string;
}
const schema = yup
  .object({
    title: yup.string().required('Tên tài liệu không được để trống').trim()
  })
  .required();

const NewDocument = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit: SubmitHandler<IFormData> = (data) => {
    dispatch(fetchCreateDocument(data));
    setOpen(false);
    setValue('title', '');
    setValue('description', '');
  };
  return (
    <Wrapper>
      <Container>
        <Row onClick={() => setOpen(true)}>
          <NoteAdd fontSize="large" color="primary" />
          <Typography variant="h6">Thêm tài liệu</Typography>
        </Row>
        <FormDialog>
          <Dialog
            fullWidth
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <HeaderForm>
                  <Title>
                    <Typography variant="h6" component={'h6'}>
                      Tạo tài liệu mới
                    </Typography>
                  </Title>
                  <Label onClick={handleClose}>
                    <Close />
                  </Label>
                </HeaderForm>
                <Divider />
                <BodyForm>
                  <Input>
                    <Typography>Tên tài liệu</Typography>
                    <FormControl fullWidth>
                      <TextField
                        {...register('title')}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        size="small"
                      />
                    </FormControl>
                  </Input>
                  <Input>
                    <Typography>Mô tả</Typography>
                    <FormControl fullWidth>
                      <TextField {...register('description')} size="small" />
                    </FormControl>
                  </Input>
                  <Input>
                    <Typography>File(Not active)</Typography>
                    <FormControl fullWidth>
                      <TextField
                        InputProps={{
                          readOnly: true
                        }}
                        type={'file'}
                        size="small"
                      />
                    </FormControl>
                  </Input>
                </BodyForm>
                <FooterForm>
                  <Cancel onClick={handleClose}>
                    <Typography fontWeight={500}>Hủy bỏ</Typography>
                  </Cancel>
                  <Save disabled={!isValid} type="submit">
                    <Typography fontWeight={500}>Xác nhận</Typography>
                  </Save>
                </FooterForm>
              </DialogContent>
            </Form>
          </Dialog>
        </FormDialog>
      </Container>
    </Wrapper>
  );
};

export default NewDocument;
