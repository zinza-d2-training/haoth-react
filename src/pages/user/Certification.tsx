import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Menu from './Menu';
import Divider from './Divider';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Logo_3, QrCode } from '../../assets/images';
import { Person } from '@mui/icons-material';
import { formatDate } from '../../utils/formatTime';
import { useAppSelector } from '../../app';
import { selectUser } from '../../features/auth/authSlice';
import { useAccessToken } from '../../hooks/useAccessToken';
import { IVaccineRegistrationResponse } from '../../interfaces/interface';
import { STATUS } from '../../enum/status.enum';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Wrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 80px - 256px);
`;
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 36px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Certificate = styled.div`
  width: 70%;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 46px;
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Table = styled.div`
  width: 100%;
`;
const Redirect = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 50px;
`;
const To = styled(Link)`
  text-decoration: none;
  padding: 6px 16px;
  background: #303f9f;
  border-radius: 8px 8px 8px 0px;
  color: #ffffff;
`;

const Card = styled.div`
  width: 30%;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const BoxCard = styled.div<{ completed: boolean }>`
  max-width: 340px;
  width: 100%;
  height: 668px;
  padding: 24px;
  box-sizing: border-box;
  background: ${(props) => (props.completed ? '#43A047' : '#f2e11a')};
  box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.175);
  border-radius: 8px 8px 8px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Logo = styled.img`
  margin-bottom: 24px;
`;
const Qrcode = styled.div`
  width: 196px;
  height: 196px;
  margin: 24px 0;
`;
const Image = styled.img``;
const Information = styled.div`
  width: 292px;
  height: 220px;
  padding: 16px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 8px 8px 8px 0;
  display: flex;
  flex-direction: column;
`;
const Item = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;
const Data = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
`;
const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'M??i s???',
    type: 'number',
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'time',
    headerName: 'Th???i gian ti??m',
    minWidth: 210,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => formatDate(params.row.time)
  },
  {
    field: 'vaccineName',
    headerName: 'T??n Vaccine',
    minWidth: 250,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.vaccine.name
  },
  {
    field: 'numberLot',
    headerName: 'S??? l??',
    minWidth: 125,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.vaccine.code
  },
  {
    field: 'location',
    headerName: '?????a ??i???m ti??m',
    minWidth: 250,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.site.name
  }
];
const Certification = () => {
  const axiosToken = useAxiosPrivate();
  const currentUser = useAppSelector(selectUser);
  const token: string = useAccessToken();
  const [vaccineRegisters, setVaccineRegisters] = useState<
    IVaccineRegistrationResponse[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosToken.get<IVaccineRegistrationResponse[]>(
          'vaccine-registrations/users',
          {
            params: {
              token: token,
              status: STATUS.COMPLETED
            }
          }
        );
        setVaccineRegisters(res.data);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    };
    fetchData();
  }, [token, axiosToken]);
  return (
    <Wrapper>
      <Menu />
      <Divider />
      <Container>
        <Certificate>
          <Title>
            <Typography fontWeight={400} variant="body1" align="center">
              C???NG H??A X?? H???I CH??? NGH??A VI???T NAM
            </Typography>
            <Typography fontWeight={500} variant="body1" align="center">
              ?????c l???p - T??? do - H???nh ph??c
            </Typography>
            <Typography marginTop={5} variant="h5" component={'h5'}>
              CH???NG NH???N TI??M CH???NG COVID-19
            </Typography>
          </Title>
          <Body>
            <Row>
              <Col>
                <Typography fontWeight={400} variant="body1" align="left">
                  H??? v?? t??n
                </Typography>
                <Typography fontWeight={500} variant="body1" align="left">
                  {currentUser?.name}
                </Typography>
              </Col>
              <Col>
                <Typography fontWeight={400} variant="body1" align="left">
                  Ng??y sinh
                </Typography>
                <Typography fontWeight={500} variant="body1" align="left">
                  {currentUser.birthday + ''}
                </Typography>
              </Col>
              <Col>
                <Typography fontWeight={400} variant="body1" align="left">
                  S??? CMND/CCCD
                </Typography>
                <Typography fontWeight={500} variant="body1" align="left">
                  {currentUser?.identifyCard}
                </Typography>
              </Col>
              <Col>
                <Typography fontWeight={400} variant="body1" align="left">
                  S??? th??? BHYT
                </Typography>
                <Typography fontWeight={500} variant="body1" align="left">
                  030094005102
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography fontWeight={400} variant="body1" align="left">
                  ?????a ch???
                </Typography>
                <Typography fontWeight={500} variant="body1" align="left">
                  {currentUser?.ward?.name +
                    ' - ' +
                    currentUser.ward?.district?.name +
                    ' - ' +
                    currentUser.ward?.district?.province?.name}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography fontWeight={400} variant="body1" align="left">
                  K???t lu???n
                </Typography>
                <Typography fontWeight={500} variant="body1" align="left">
                  {vaccineRegisters.length > 0
                    ? '???? ???????c ti??m ph??ng v???c xin ph??ng b???nh Covid-19'
                    : 'B???n ch??a ti??m ph??ng v???c xin ph??ng b??nh Covid-19'}
                </Typography>
              </Col>
            </Row>
          </Body>
          <Table>
            <DataGrid
              disableColumnMenu
              disableColumnSelector
              hideFooter
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  background: 'rgba(238, 238, 238, 0.4)'
                }
              }}
              autoPageSize={false}
              autoHeight
              rows={vaccineRegisters}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Table>
          <Redirect>
            <To to={'/registration-step-1'}>
              <Typography fontWeight={500}>????ng k?? m??i ti???p theo</Typography>
            </To>
          </Redirect>
        </Certificate>
        <Card>
          {vaccineRegisters.length > 0 && (
            <BoxCard completed={vaccineRegisters?.length >= 2}>
              <Logo src={Logo_3} alt="logo" />
              <Typography
                fontWeight={500}
                color="#FFFFFF"
                variant="h5"
                component={'h5'}>
                ???? TI??M {vaccineRegisters.length} M??I V???C XIN
              </Typography>
              <Qrcode>
                <Image src={QrCode} alt="QRCode" />
              </Qrcode>
              <Information>
                <Item>
                  <Person />
                  <Data>
                    <Typography sx={{ marignBottom: '4px' }} variant="body1">
                      H??? v?? t??n
                    </Typography>
                    <Typography fontWeight={500} variant="body1">
                      {currentUser?.name}
                    </Typography>
                  </Data>
                </Item>
                <Item>
                  <Person />
                  <Data>
                    <Typography sx={{ marignBottom: '4px' }} variant="body1">
                      Ng??y sinh
                    </Typography>
                    <Typography fontWeight={500} variant="body1">
                      {currentUser?.birthday + ''}
                    </Typography>
                  </Data>
                </Item>
                <Item>
                  <Person />
                  <Data>
                    <Typography sx={{ marignBottom: '4px' }} variant="body1">
                      S??? CMND/CCCD
                    </Typography>
                    <Typography fontWeight={500} variant="body1">
                      {currentUser?.identifyCard}
                    </Typography>
                  </Data>
                </Item>
              </Information>
            </BoxCard>
          )}
        </Card>
      </Container>
    </Wrapper>
  );
};

export default Certification;
