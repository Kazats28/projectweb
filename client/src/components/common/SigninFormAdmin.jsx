import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { setAdminModalOpen } from "../../redux/features/adminModalSlice";
import { setAdmin } from "../../redux/features/adminSlice";
import { Visibility, VisibilityOff } from '@mui/icons-material';
const SigninFormAdmin = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [successLogin, setSuccessLogin] = useState(false);
  const signinFormAdmin = useFormik({
    initialValues: {
      password: "",
      email: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Hãy nhập địa chỉ Email.'),
      password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 kí tự.")
        .required("Hãy nhập mật khẩu.")
    }),
    onSubmit: async values => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      console.log("");
      sendAdminAuthRequest(values)
        .then((res) => {
          setSuccessLogin(true);     
          dispatch(setAdmin(res));
          dispatch(setAdminModalOpen(false));
          toast.success("Đăng nhập thành công!");
        })
        .catch((err) => setErrorMessage(err.message));
      setIsLoginRequest(false);
      if(successLogin) SigninFormAdmin.resetForm();
    }
  });

  return (
    <Box component="form" onSubmit={signinFormAdmin.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Email Admin"
          name="email"
          fullWidth
          value={signinFormAdmin.values.email}
          onChange={signinFormAdmin.handleChange}
          color="success"
          error={signinFormAdmin.touched.email && signinFormAdmin.errors.email !== undefined}
          helperText={signinFormAdmin.touched.email && signinFormAdmin.errors.email}
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          placeholder="Mật khẩu Admin"
          name="password"
          fullWidth
          value={signinFormAdmin.values.password}
          onChange={signinFormAdmin.handleChange}
          color="success"
          error={signinFormAdmin.touched.password && signinFormAdmin.errors.password !== undefined}
          helperText={signinFormAdmin.touched.password && signinFormAdmin.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  tabIndex={-1}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        đăng nhập
      </LoadingButton>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default SigninFormAdmin;