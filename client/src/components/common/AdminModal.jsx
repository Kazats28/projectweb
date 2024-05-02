import { Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAdminModalOpen } from "../../redux/features/adminModalSlice";
import Logo from "./Logo";
import SigninFormAdmin from "./SigninFormAdmin";

const AdminModal = () => {
  const { adminModalOpen } = useSelector((state) => state.adminModal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setAdminModalOpen(false));
  return (
    <Modal open={adminModalOpen} onClose={handleClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "600px",
        padding: 4,
        outline: "none"
      }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper" }}>
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo />
          </Box>
          <SigninFormAdmin/>
        </Box>
      </Box>
    </Modal>
  );
};

export default AdminModal;