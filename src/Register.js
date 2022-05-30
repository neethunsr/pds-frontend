import * as React from "react";
import { TextField, Button, Container, Box, Avatar } from "@mui/material";
import { useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Header from "./components/Header";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log("submission.....");
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
      name: "SIGN IN",
      link: "/",
      id: 2,
    },
  ];
  return (
    <div>
      <Header pages={pages} log={false} />
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "30px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#17396B" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New User Registration
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Box mb={2}>
            <TextField
              variant="outlined"
              label="User Id"
              color="success"
              fullWidth
              autoFocus
              {...register("UserId", { required: true, maxLength: 20 })}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              color="success"
              label="Name"
              fullWidth
              autoFocus
              {...register("name", { required: true, maxLength: 20 })}
            />
          </Box>
          <Box mb={2}>
            <TextField
              color="success"
              variant="outlined"
              label="MetaMask Address"
              fullWidth
              autoFocus
              {...register("metaAddress", { required: true, maxLength: 20 })}
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              color="success"
              label="Phone Number"
              fullWidth
              autoFocus
              {...register("phoneNumber", { required: true, maxLength: 20 })}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            style={{
              background: "#17396B",
              margin: "40px 0",
            }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterPage;
