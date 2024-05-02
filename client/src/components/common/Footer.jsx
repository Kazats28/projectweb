import { Paper, Stack, Button, Box, Typography } from '@mui/material';
import React from 'react';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Stack marginLeft={"10%"} direction={"column"}>
            <Typography sx={{fontSize: "20px"}}>CÔNG TY TNHH MỘT THÀNH VIÊN VIỆT NAM</Typography>
            <Typography>Giấy Chứng nhận đăng ký doanh nghiệp: 0123456789 đăng ký lần đầu ngày 30/04/2024, được cấp bởi Sở Kế hoạch và Đầu tư Thành phố Hà Nội</Typography>
            <Typography>Địa chỉ: Km10, Đường Nguyễn Trãi, Q.Hà Đông, Hà Nội, Việt Nam</Typography>
            <Typography>Đường dây nóng (Hotline): 1900 1009</Typography>
          </Stack>
          {/* <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box> */}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;