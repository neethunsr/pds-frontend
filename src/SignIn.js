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
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import app from "./firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import "firebase/firestore";

const theme = createTheme();

export default function SignIn() {
  const auth = getAuth();
  const [userid, setUserid] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otpno, setOtpno] = useState("");
  const [loader, setLoader] = useState(true);
  const ref = app.firestore().collection("users");
  const [data, setData] = useState([]);

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        setData(items);
        setLoader(false);
      });
    });
  }

  useEffect(() => {
    getData();
    setLoader(false);
    console.log(data);
  }, []);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log(response, "reCAPTCHA response");
        },
      },
      auth
    );
  };
  const [flag, setflag] = useState("");
  const onSignInSubmit = async (e) => {
    e.preventDefault();
    const dataFromForm = new FormData(e.currentTarget);
    const userno = dataFromForm.get("userid");
    // Find user in firebase collection
    const userObj = data.find((user) => user.license === userno);
    console.log(userObj);
    if (!userObj) {
      toast.error("User ID not found");
      return;
    }
    if (userObj.approval !== true) {
      toast.error("User not approved by admin");
      return;
    }
    const phoneNumber = "+91" + userObj.phone;
    if (!phoneNumber) {
      toast.error("No phone number associated with this user");
      return;
    }
    if (!window.recaptchaVerifier) {
      configureCaptcha();
    }
    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShow(true);
        console.log(confirmationResult);
        console.log("OTP has been sent");
      })
      .catch((error) => {
        console.error("SMS not sent", error);
        toast.error("SMS not sent");
      });
    if (userno[0] === "S") {
      setflag("S");
      console.log(phoneNo);
    } else if (userno[0] === "I") {
      setflag("I");
    } else if (userno[0] === "a") {
      setflag("a");
    } else {
      toast.error("Enter correct userid");
    }
  };

  const [success, setsuccess] = useState(false);
  const onSubmitOTP = (e) => {
    e.preventDefault();

    const code = otpno;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user), "User signed in successfully.");
        // Store user id in localStorage
        if (user && user.id) {
          localStorage.setItem("firebaseUserId", user.id);
        }
        toast.success("User verified");
        setsuccess(true);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("User couldn't sign in");
      });
  };

  if (success === true && flag === "I") {
    window.location.href = "/imallocation";
  }
  if (success === true && flag === "S") {
    window.location.href = "/skallocation";
  }
  if (success === true && flag === "a") {
    window.location.href = "/admin";
  }
  const [show, setShow] = useState(false);

  const handleUserChange = (e) => {
    setUserid(e.target.value);
  };
  const handleOTPChange = (e) => {
    setOtpno(e.target.value);
  };

  const pages = [
    {
      name: "HOME",
      link: "/",
      id: 1,
    },
    {
      name: "ABOUT US",
      link: "/about",
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
              onSubmit={onSignInSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <div id="sign-in-button"></div>
              <TextField
                margin="normal"
                color="success"
                required
                fullWidth
                id="user_id"
                label="User Id"
                name="userid"
                autoFocus
                onChange={handleUserChange}
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
                />
              )}
              {show && (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={onSubmitOTP}
                  style={{
                    background: "#17396B",
                    margin: "50px 0",
                  }}
                  id="confirm-code"
                >
                  Submit
                </Button>
              )}
              {show ? (
                <></>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    background: "#17396B",
                    margin: "50px 0",
                  }}
                  id="sign-in-button"
                  onSubmit={onSignInSubmit}
                >
                  Get OTP
                </Button>
              )}
              <div id="recaptcha-container"></div>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
