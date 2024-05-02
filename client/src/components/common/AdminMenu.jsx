import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { setAdmin } from "../../redux/features/adminSlice";
import { useNavigate } from "react-router-dom";
const AdminMenu = () => {
  const { admin } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      {admin && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            ADMIN
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.admin.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText disableTypography primary={
                  <Typography textTransform="uppercase">{item.display}</Typography>
                } />
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => {dispatch(setAdmin(null)); navigate("/");}}
            >
              <ListItemIcon><LogoutOutlinedIcon /></ListItemIcon>
              <ListItemText disableTypography primary={
                <Typography textTransform="uppercase">đăng xuất</Typography>
              } />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default AdminMenu;