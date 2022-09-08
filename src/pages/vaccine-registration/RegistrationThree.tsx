import React from 'react';
import styled from '@emotion/styled';
import Heading from './Heading';
import StepCheck from './StepCheck';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
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
const Form = styled.div`
  width: 100%;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;
const Code = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;
const CodeStrong = styled.span`
  color: #ef5350;
`;
const OutLink = styled.a`
  color: #ef5350;
  text-decoration: none;
`;
const Information = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 16px 0;
`;
const Col = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
const RegistrationThree = () => {
  return (
    <Wrapper>
      <Heading />
      <Container>
        <StepCheck currentStep={4} />
        <Form>
          <HeaderText>
            <Code>
              <Typography variant="h6" component={'h6'}>
                Đăng ký tiêm chủng COVID-19 thành công. Mã đặt tiêm của bạn là:{' '}
                <CodeStrong>0120211103501237</CodeStrong>.
              </Typography>
            </Code>
            <Code>
              <Typography variant="body1" component={'span'}>
                Cảm ơn quý khách đã đăng ký tiêm chủng vắc xin COVID-19. Hiện
                tại Bộ y tế đang tiến hành thu thập nhu cầu và thông tin để lập
                danh sách đối tượng đăng ký tiêm vắc xin COVID-19 theo từng địa
                bàn. Chúng tôi sẽ liên hệ với quý khách theo số điện thoại
                0123456789 khi có kế hoạch tiêm trong thời gian sớm nhất.
              </Typography>
            </Code>
            <Code>
              <Typography variant="body1" component={'span'}>
                Mời bạn tải ứng dụng "SỔ SỨC KHỎE ĐIỆN TỬ" tại{' '}
                <OutLink href="https://hssk.kcb.vn/#/sskdt">
                  https://hssk.kcb.vn/#/sskdt
                </OutLink>{' '}
                để theo dõi kết quả đăng ký tiêm và nhận chứng nhận tiêm chủng
                COVID-19
              </Typography>
            </Code>
          </HeaderText>
          <Information>
            <Row>
              <Col>
                <Typography variant="body1">Họ và tên</Typography>
                <Typography fontWeight={500} variant="body1">
                  Tạ Hữu Hào
                </Typography>
              </Col>
              <Col>
                <Typography variant="body1">Ngày sinh</Typography>
                <Typography fontWeight={500} variant="body1">
                  18/10/2000
                </Typography>
              </Col>
              <Col>
                <Typography variant="body1">Giới tính</Typography>
                <Typography fontWeight={500} variant="body1">
                  Nam
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography variant="body1">
                  Số CMND/CCCD/Mã định dạng công dân
                </Typography>
                <Typography fontWeight={500} variant="body1">
                  Tạ Hữu Hào
                </Typography>
              </Col>
              <Col>
                <Typography variant="body1">Số thẻ BHYT</Typography>
                <Typography fontWeight={500} variant="body1">
                  18/10/2000
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography variant="body1">Tỉnh/Thành phố</Typography>
                <Typography fontWeight={500} variant="body1">
                  Thành phố Hà Nội
                </Typography>
              </Col>
              <Col>
                <Typography variant="body1">Quận/Huyện</Typography>
                <Typography fontWeight={500} variant="body1">
                  Quận Hai Bà Trưng
                </Typography>
              </Col>
              <Col>
                <Typography variant="body1">Xã/Phường</Typography>
                <Typography fontWeight={500} variant="body1">
                  Bách Khoa
                </Typography>
              </Col>
            </Row>
          </Information>
          <Submit>
            <Link style={{ textDecoration: 'none' }} to={'/'}>
              <Cancel startIcon={<ArrowBack />}>
                <Typography sx={{ fontWeight: 500 }}>Trang chủ</Typography>
              </Cancel>
            </Link>
            <Continue startIcon={<ArrowBack />}>
              <Typography sx={{ fontWeight: 500 }}>Xuất thông tin</Typography>
            </Continue>
          </Submit>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default RegistrationThree;
