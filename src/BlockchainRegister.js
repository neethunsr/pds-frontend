import * as React from 'react'
import {Box,Container,TextField,Button,FormControl,Select,InputLabel,MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';

const BlockRegister = () => {

    const {register,handleSubmit} = useForm()

    const onSubmit = (data) =>{
        console.log(data)
    }

    const handleChange = (event) => {
      console.log(event.target.value)
    }

    return (
        <div className = "mt-5">
            <h1>BLOCK-CHAIN REGISTRATION</h1>
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
            type = "text"
            variant = "outlined"
            label = "MetaMask Address"
            fullWidth
            autoFocus
            {...register("metaMaskAddress", { required: true, maxLength: 20 })}
          />
        </Box>
        <Box mb = {2}>
            <TextField
            type = "text" 
            variant = "outlined"
            label = "ifHash"
            min = "1"
            max = "12"
            fullWidth
            autoFocus
            {...register("month", { required: true, maxLength: 2 })}
            />
        </Box>
      <FormControl fullWidth>
        <InputLabel id="registerType">Registration Type</InputLabel>
          <Select
            labelId="registerType"
            id="registerType"
            // value={age}
            label="Registration Type"
            onChange={handleChange}
          >
            <MenuItem  value = "1">Shop Keeper</MenuItem>
            <MenuItem  value = "2">Inventory Manager</MenuItem>
          </Select>
      </FormControl>
      </form>
      <Button type = "submit" variant = "contained" color = "primary" onClick = {handleSubmit(onSubmit)} >Submit</Button>
    </Container>
    </div>
    )
}

export default BlockRegister;