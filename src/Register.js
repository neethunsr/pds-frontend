import * as React from 'react';
import { TextField,Button,Container,Box } from '@mui/material';
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const {register,handleSubmit} = useForm();

  const onSubmit = (data) => {
    console.log(data)
    console.log("submission.....")
  }


  return (
    <div className = "mt-5">
      <h1>REGISTRATION  </h1>
    <Container 
      maxWidth = "xs"
    >
      <form>
        <Box
          sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
        ></Box>
        <Box mb = {2}>
          <TextField 
            variant = "outlined"
            label = "user Id"
            fullWidth
            autoFocus
            {...register("userId", { required: true, maxLength: 20 })}
          />
        </Box>
        <Box mb = {2}>
            <TextField 
            variant = "outlined"
            label = "Name"
            fullWidth
            autoFocus
            {...register("name", { required: true, maxLength: 20 })}
            />
        </Box>
        <Box mb = {2}>
            <TextField 
            variant = "outlined"
            label = "MetaMask Address"
            fullWidth
            autoFocus
            {...register("metaAddress", { required: true, maxLength: 20 })}
            />
        </Box>
        <Box mb = {2}>
            <TextField 
            variant = "outlined"
            label = "Phone Number"
            fullWidth
            autoFocus
            {...register("phoneNumber", { required: true, maxLength: 20 })}
            />
        </Box>
      </form>
      <Button type = "submit" variant = "contained" color = "primary" onClick = {handleSubmit(onSubmit)} >Submit</Button>
    </Container>
    </div>
  )
}

export default RegisterPage;
