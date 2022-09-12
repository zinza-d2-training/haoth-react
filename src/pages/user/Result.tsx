import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Divider from './Divider';
import Menu from './Menu';
import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableBody,
  Typography,
  TableCell
} from '@mui/material';
import { useLocalStorage } from '../../hooks';
import { fetchUser, InfoUser } from '../../features/user/userAPI';
import { formatDate } from '../../utils/formatTime';

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
  flex-direction: column;
`;
const Status = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
  background: #e8eaf6;
  border: 1px solid #3f51b5;
  border-radius: 30px;
`;
const Cell = styled(TableCell)`
  text-align: center;
`;
const Result = () => {
  const [data] = useLocalStorage('vaccineRegistration', '');
  const [user, setUser] = useState<InfoUser>();
  useEffect(() => {
    const res = fetchUser(data.userId);
    setUser(res);
  }, [data]);
  return (
    <Wrapper>
      <Menu />
      <Divider />
      <Container>
        <TableContainer>
          <Table sx={{ border: '1px solid #EEEEEE' }}>
            <TableHead sx={{ background: 'rgba(238, 238, 238,0.4)' }}>
              <TableRow sx={{ height: '72px' }}>
                <Cell>STT</Cell>
                <Cell>Họ và tên</Cell>
                <Cell>Ngày sinh</Cell>
                <Cell>Giới tính</Cell>
                <Cell>Số CMND/CCCD/Mã định danh công dân</Cell>
                <Cell>Trạng thái</Cell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user && (
                <TableRow>
                  <Cell>
                    <Typography>1</Typography>
                  </Cell>
                  <Cell>
                    <Typography>{user?.name}</Typography>
                  </Cell>
                  <Cell>
                    <Typography>
                      {formatDate(user?.birthday as string)}
                    </Typography>
                  </Cell>
                  <Cell>
                    <Typography>{user?.gender}</Typography>
                  </Cell>
                  <Cell>
                    <Typography>{user?.card}</Typography>
                  </Cell>
                  <Cell>
                    <Status>
                      <Typography>Đăng ký thành công</Typography>
                    </Status>
                  </Cell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Wrapper>
  );
};

export default Result;
