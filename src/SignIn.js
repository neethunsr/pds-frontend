import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import { Paper } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const theme = createTheme();

export default function SignIn() {
  require("firebase/auth");
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setShow] = useState(false);
  const [final, setfinal] = useState("");
  var authvar = false;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      userId: data.get("userid"),
      phoneNumber: data.get("phone_number"),
    });

    const phoneNumber = data.get("phone_number");
    const userId = data.get("userid");
    var number = "91" + phoneNumber;

    if (authvar === true) {
      // const otp = data.get("otp");
      console.log(otp);
    } else {
      // let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      // // firebase.auth.signInWithPhoneNumber(number, verify).then((result) => {
      // //     setfinal(result);
      // //     alert("code sent")
      // //     // setshow(true);
      // // })
      // //     .catch((err) => {
      // //         alert(err);
      // //         window.location.reload()
      // //     })
    }

    authvar = true;
  };

  // const [show, setShow] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Get OTP");
  const [userid, setUserid] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otpno, setOtpno] = useState("");

  const getOTP = () => {
    setShow(true);
    setButtonText("Submit");
  };

  const handleUserChange = (e) => {
    setUserid(e.target.value);
  };
  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };
  const handleOTPChange = (e) => {
    setOtpno(e.target.value);
  };
  const onLogin = (e) => {
    if (userid === "IM1024" && phoneNo === "7034398989" && otpno === "2371") {
      window.location.href = "/imallocation";
    } else if (
      userid === "SK1369" &&
      phoneNo === "7034398989" &&
      otpno === "5678"
    ) {
      window.location.href = "/skallocation";
    } else if (
      userid === "admin" &&
      phoneNo === "7034398989" &&
      otpno === "4408"
    ) {
      window.location.href = "/admin";
    } else {
      toast.error("Invalid credantials");
    }
  };

  const pages = [
    {
      name: "HOME",
      link: "/",
      id: 1,
    },
    {
      name: "ABOUT US",
      link: "#",
      id: 3,
    },
    {
      name: "REGISTER",
      link: "/register",
      id: 2,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Header pages={pages} log={false} />
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <Container component="main" maxWidth="xs"> */}
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://media.istockphoto.com/photos/wheat-field-sunset-picture-id155602366?b=1&k=20&m=155602366&s=170667a&w=0&h=KI1VrWWW5m7ZwSgN9z3mGI51sZHbVRGDO7MTtTd_GnE=)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingBottom: "50px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#17396B" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                color="success"
                required
                fullWidth
                id="user_id"
                label="User Id"
                name="userid"
                // autoComplete="email"
                autoFocus
                onChange={handleUserChange}
              />
              <TextField
                color="success"
                margin="normal"
                required
                fullWidth
                name="phone_number"
                label="Phone Number"
                type="text"
                id="phone_number"
                // autoComplete="current-password"
                onChange={handlePhoneNoChange}
              />
              {show && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  color="success"
                  name="otp"
                  label="OTP"
                  type="text"
                  id="otp"
                  variant="standard"
                  onChange={handleOTPChange}
                  // autoComplete="current-password"
                />
              )}
              {show && (
                <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onLogin}
                  style={{
                    background: "#17396B",
                    margin: "50px 0",
                  }}
                >
                  Submit
                </Button>
              )}
              {show ? (
                <></>
              ) : (
                <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={getOTP}
                  style={{
                    background: "#17396B",
                    margin: "50px 0",
                  }}
                >
                  Get OTP
                </Button>
              )}
              <div id="recarecaptcha-container"></div>
              <Grid container>
                {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        {/* </Container> */}
      </Grid>
    </ThemeProvider>
  );
}
