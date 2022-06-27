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
import { initializeApp } from "firebase/app";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import customersData from "./data/customers.json";
import firebase from "./firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const theme = createTheme();
const firebaseConfig = {
  apiKey: "AIzaSyC93gdZfaSH3bHm_4u7MD6ImjbrFpbgxSc",
  authDomain: "finalprojectpds-b9a7e.firebaseapp.com",
  projectId: "finalprojectpds-b9a7e",
  storageBucket: "finalprojectpds-b9a7e.appspot.com",
  messagingSenderId: "426892116372",
  appId: "1:426892116372:web:6ace6da8e77ba269ef4f81",
  measurementId: "G-Z8QLN3F6XG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

// const phoneNumber = "+917034398989";

export default function SignIn() {
  const auth = getAuth();
  auth.languageCode = "it";
  const [userid, setUserid] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otpno, setOtpno] = useState("");
  const [loader, setLoader] = useState(true);
  const ref = firebase.firestore().collection("users");
  const [data, setData] = useState([]);
  // console.log(data);

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
  // const [rationid, setRationid] = useState();
  // if (loader === false) {
  //   data.map((user) => {
  //     // setRationid(user.rationid);
  //     // console.log(user.rationid);
  //     if (user.rationid == userid) {
  //       setPhoneNo(user.phoneno);
  //     }
  //   });
  //   // console.log(rationid);
  // }

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
          console.log(response);
        },
        defaultCountry: "IND",
      },
      auth
    );
  };
  const [flag, setflag] = useState("");
  const onSignInSubmit = (e) => {
    e.preventDefault();
    const dataFromForm = new FormData(e.currentTarget);
    const userno = dataFromForm.get("userid");
    // console.log(userno);
    data.map((user) => {
      // setRationid(user.rationid);
      console.log(user);
      // console.log(user.rationid);
      if (user.rationid === userno) {
        console.log("User verified!");
      }
    });

    // console.log(flag);
    // setPhoneNo()
    configureCaptcha();

    const phoneNumber = "+917034398989";
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setShow(true);

        console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log("SMS not sent");
      });
    if (userno[0] === "S") {
      // window.location.href = "/imallocation";
      setflag("S");
      console.log(phoneNo);
    } else if (userno[0] === "I") {
      setflag("I");

      // setPhoneNo("7034398989");
      // window.location.href = "/skallocation";
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
        console.log(JSON.stringify(user));
        toast.success("User verified");
        setsuccess(true);
        // ...
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
  // require("firebase/auth");
  const [show, setShow] = useState(false);

  const handleUserChange = (e) => {
    setUserid(e.target.value);
  };
  // const handlePhoneNoChange = (e) => {
  //   setPhoneNo(e.target.value);
  // };
  const handleOTPChange = (e) => {
    setOtpno(e.target.value);
  };
  // const onLogin = (e) => {
  //   if (userid === "IM1024" && phoneNo === "7034398989" && otpno === "2371") {
  //     window.location.href = "/imallocation";
  //   } else if (
  //     userid === customersData.map() &&
  //     phoneNo === "7034398989" &&
  //     otpno === "5678"
  //   ) {
  //     window.location.href = "/skallocation";
  //   } else if (
  //     userid === "admin" &&
  //     phoneNo === "7034398989" &&
  //     otpno === "4408"
  //   ) {
  //     window.location.href = "/admin";
  //   } else {
  //     toast.error("Invalid credantials");
  //   }
  // };

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
                // autoComplete="email"
                autoFocus
                onChange={handleUserChange}
              />
              {/* <TextField
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
              /> */}
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
                  // fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  // onClick={getOTP}
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
              <div id="recarecaptcha-container"></div>
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
        {/* </Container> */}
      </Grid>
    </ThemeProvider>
  );
}
