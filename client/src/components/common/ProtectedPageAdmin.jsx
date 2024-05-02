import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminModalOpen } from "../../redux/features/adminModalSlice";

const ProtectedPageAdmin = ({ children }) => {
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(setAdminModalOpen(!admin));
  }, [admin, dispatch]);

  return (
    admin ? children : null
  );
};

export default ProtectedPageAdmin;