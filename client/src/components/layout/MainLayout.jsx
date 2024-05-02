import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import AdminModal from "../common/AdminModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/features/userSlice";
import { getAdminById } from "../../api-helpers/api-helpers";
import { setAdmin } from "../../redux/features/adminSlice";
const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);
  useEffect(() => {
    const authAdmin = async () => {
      getAdminById()
        .then((res) => {
          dispatch(setAdmin(res));
        })
        .catch((err) => dispatch(setAdmin(null)));
    };

    authAdmin();
  }, [dispatch]);
  return (
    <>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}
      <AdminModal />
      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
        >
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;