import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Autocomplete,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { listProvinces, listDistricts, listWards } from '../../data/fake';
import { IDistrict, IProvince, IWard } from '../../interfaces';
import { useLocalStorage } from '../../hooks';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAppDispatch } from '../../app';
import { updateInformationAsync } from '../../features/user/updateInforSlice';

const Wrapper = styled.div`
  width: 100%;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 16px;
`;
const Component = styled.div`
  width: 318px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;
`;
const Label = styled(Typography)`
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 5px;
`;
const Cancel = styled(Button)`
  padding: 6px 16px;
  border: 1px solid rgba(63, 81, 181, 0.5);
  border-radius: 4px;
  color: #3f51b5;
  margin-right: 16px;
`;
const Save = styled(Button)`
  padding: 6px 16px;
  background: #3f51b5;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: #ffffff;
`;

const schema = yup
  .object({
    name: yup.string().required('Tên không được để trống').trim(),
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
interface IFormData {
  card: string;
  name: string;
  birthday: string;
  gender: string;
  province: string;
  district: string;
  ward: string;
}
interface EditProps {
  edit?: boolean;
}
const UpdateInformation: React.FC<EditProps> = (props) => {
  const dispatch = useAppDispatch();
  const [user] = useLocalStorage('user', '');
  const [provinceSelect, setProvinceSelect] = useState<IProvince>();
  const [districtSelect, setDistrictSelect] = useState<IDistrict>();
  const [wardSelect, setWardSelect] = useState<IWard>();
  const [provinces] = useState<IProvince[]>(listProvinces);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      card: user?.card,
      gender: user?.gender,
      birthday: user?.birthday,
      province: user?.province,
      district: user?.district,
      ward: user?.ward
    }
  });
  const province = watch('province');
  const district = watch('district');
  const ward = watch('ward');
  useEffect(() => {
    if (!!provinceSelect) {
      setValue('district', '');
      setValue('ward', '');
      setValue('province', provinceSelect.label);
      setDistricts([]);
      setWards([]);
      const data = listDistricts.filter(
        (item: IDistrict) => item.province_code === provinceSelect.code
      );
      setDistricts(data);
    }
  }, [provinceSelect, setValue]);
  useEffect(() => {
    if (!!districtSelect) {
      setValue('district', districtSelect.label);
      setValue('ward', '');
      setWards([]);
      const data = listWards.filter(
        (item: IWard) => item.district_code === districtSelect.code
      );
      setWards(data);
    }
  }, [districtSelect, setValue]);
  useEffect(() => {
    if (province === '') {
      setValue('district', '');
      setValue('ward', '');
    }
  }, [province, setValue]);
  useEffect(() => {
    if (district === '') {
      setValue('ward', '');
    }
  }, [district, setValue]);
  useEffect(() => {
    if (!!wardSelect) {
      setValue('ward', wardSelect.label);
    }
  }, [wardSelect, setValue]);
  const handleReset = () => {
    setValue('name', user?.name);
    setValue('card', user?.card);
    setValue('birthday', user?.birthday);
    setValue('gender', user?.gender);
    setValue('province', user?.province);
    setValue('district', user?.district);
    setValue('ward', user?.ward);
  };
  const onSubmit: SubmitHandler<IFormData> = (data) => {
    dispatch(updateInformationAsync(data));
    alert('Cap nhat thanh cong');
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ marginBottom: '24px' }}>
          <Component>
            <Label>Số CMND/CCCD/Mã định danh</Label>
            <FormControl fullWidth>
              <TextField
                inputProps={{
                  readOnly: !props.edit
                }}
                {...register('card')}
                error={!!errors.card}
                helperText={errors.card?.message}
                size="small"
                defaultValue={user?.card}
              />
            </FormControl>
          </Component>
        </Row>
        <Row>
          <Component>
            <Label>Họ và tên</Label>
            <FormControl fullWidth>
              <TextField
                inputProps={{
                  readOnly: !props.edit
                }}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name')}
                size="small"
                defaultValue={user?.name}
              />
            </FormControl>
          </Component>
          <Component>
            <Label>Ngày sinh</Label>
            <FormControl fullWidth>
              <Controller
                control={control}
                {...register('birthday')}
                render={({ field }) => (
                  <Stack
                    sx={{
                      width: '100%',
                      height: '50px',
                      textAlign: 'left'
                    }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        readOnly={!props.edit}
                        disableFuture
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={field.value || user?.birthday}
                        onChange={(date: any) => {
                          field.onChange(date ? date : '');
                        }}
                        renderInput={(params: any) => {
                          return <TextField {...params} size="small" />;
                        }}
                      />
                    </LocalizationProvider>
                  </Stack>
                )}
              />
            </FormControl>
          </Component>
          <Component>
            <Label>Giới tính</Label>
            <FormControl fullWidth>
              <Controller
                {...register('gender')}
                control={control}
                render={({ field }) => (
                  <Select
                    readOnly={!props.edit}
                    size="small"
                    id="gender"
                    defaultValue={'Nam'}
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
          </Component>
        </Row>
        <Row>
          <Component>
            <Label>Tỉnh/Thành phố</Label>
            <FormControl fullWidth>
              <Autocomplete
                readOnly={!props.edit}
                disablePortal
                inputValue={province}
                options={provinces}
                onChange={(event, value) =>
                  setProvinceSelect(value as IProvince)
                }
                isOptionEqualToValue={() => true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register('province')}
                    size="small"
                    placeholder={user?.province}
                  />
                )}
              />
            </FormControl>
          </Component>
          <Component>
            <Label>Quận/Huyện</Label>
            <FormControl fullWidth>
              <Autocomplete
                readOnly={!props.edit || province === ''}
                disablePortal
                options={districts}
                inputValue={district}
                onChange={(event, value) =>
                  setDistrictSelect(value as IDistrict)
                }
                isOptionEqualToValue={() => true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register('district')}
                    size="small"
                    placeholder={user?.district}
                  />
                )}
              />
            </FormControl>
          </Component>
          <Component>
            <Label>Phường/Xã</Label>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                readOnly={!props.edit || district === ''}
                options={wards}
                inputValue={ward}
                onChange={(event, value) => setWardSelect(value as IWard)}
                isOptionEqualToValue={() => true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register('ward')}
                    size="small"
                    placeholder={user?.ward}
                  />
                )}
              />
            </FormControl>
          </Component>
        </Row>
        {props.edit && (
          <Row>
            <Cancel onClick={handleReset} type="reset">
              <Typography fontWeight={500}>Hủy bỏ</Typography>
            </Cancel>
            <Save type="submit">
              <Typography fontWeight={500}>Lưu</Typography>
            </Save>
          </Row>
        )}
      </Form>
    </Wrapper>
  );
};

export default UpdateInformation;
