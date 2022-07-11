import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, setRefreshTokenTimeout } from "../../actions/authActions";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import "../../style/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const showAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [loginForm, setLoginForm] = useState({
    username: "admin@test.com", //
    password: "password", //
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginForm;

  const onChangeLogin = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
    validate({ [event.target.name]: event.target.value });
  };
  const validate = (formValue) => {
    let temp = { ...errors };
    if ("username" in formValue) {
      if (formValue.username.length === 0) {
        temp.username = "Email cannot be empty.";
      } else if (!/$^|.+@.+..+/.test(formValue.username)) {
        temp.username = "Email is not valid.";
      } else {
        temp.username = "";
      }
    }
    if ("password" in formValue) {
      if (formValue.password.length === 0) {
        temp.password = "Password cannot be empty.";
      } else if (
        formValue.password.length < 3 ||
        formValue.password.length > 12
      ) {
        temp.password = "Your password must be between 3-12 characters";
      } else {
        temp.password = "";
      }
    }
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const login = (event) => {
    event.preventDefault();
    if (!validate(loginForm)) return;
    try {
      const loginform = dispatch(loginUser(loginForm));

      if (loginform.success) dispatch(setRefreshTokenTimeout(600));
      else showAlert();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{
            width: "100%",
          }}
        >
          Error
        </Alert>
      </Snackbar>
      <form className="login-wrapper" onSubmit={login}>
        <Box>
          <Box sx={{ mt: 2, color: "blue" }}>
            <h2>React Redux CRM</h2>
          </Box>
          <Box sx={{ my: 1, color: "navy" }}>
            <p>Version 2.0.0</p>
          </Box>
          <TextField
            label="Login ID"
            placeholder="test@test.com"
            sx={{ width: "100%", my: 2 }}
            name="username"
            value={username}
            onChange={onChangeLogin}
            {...(errors.username && {
              error: true,
              helperText: errors.username,
            })}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            sx={{ width: "100%", my: 2 }}
            name="password"
            value={password}
            onChange={onChangeLogin}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ background: "#3f51b5" }}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Login;
