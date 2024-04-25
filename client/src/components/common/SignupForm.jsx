import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";
import { Visibility, VisibilityOff } from '@mui/icons-material';
const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState();
  const [showPassword1, setShowPassword1] = useState();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const signinForm = useFormik({
    initialValues: {
      password: "",
      email: "",
      name: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Địa chỉ Email không hợp lệ.') // Kiểm tra xem có phải là định dạng email không
        .matches(/@gmail\.com$/, 'Email phải kết thúc bằng "@gmail.com".') // Kiểm tra xem có kết thúc bằng "@gmail.com" không
        .required('Hãy nhập địa chỉ Email.'),
      password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 kí tự.")
        .required("Hãy nhập mật khẩu."),
      name: Yup.string()
        .min(4, "Tên phải có ít nhất 4 kí tự.")
        .required("Hãy nhập tên người dùng."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp.")
        .min(8, "Mật khẩu xác nhận phải có ít nhất 8 kí tự.")
        .required("Hãy nhập mật khẩu để xác nhận.")
    }),
    onSubmit: async values => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      console.log("");
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Đăng nhập thành công!");
      }

      if (err) setErrorMessage(err.message);
    }
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Email"
          name="email"
          fullWidth
          value={signinForm.values.email}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.email && signinForm.errors.email !== undefined}
          helperText={signinForm.touched.email && signinForm.errors.email}
        />
        <TextField
          type="text"
          placeholder="Tên"
          name="name"
          fullWidth
          value={signinForm.values.name}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.name && signinForm.errors.name !== undefined}
          helperText={signinForm.touched.name && signinForm.errors.name}
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          placeholder="Mật khẩu"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.password && signinForm.errors.password !== undefined}
          helperText={signinForm.touched.password && signinForm.errors.password}
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
        <TextField
          type={showPassword1 ? 'text' : 'password'}
          placeholder="Xác nhận mật khẩu"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.confirmPassword && signinForm.errors.confirmPassword !== undefined}
          helperText={signinForm.touched.confirmPassword && signinForm.errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword1(!showPassword1)}
                  edge="end"
                  tabIndex={-1}
                >
                  {showPassword1 ? <Visibility /> : <VisibilityOff />}
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
        Đăng ký
      </LoadingButton>

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        Đăng nhập
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;