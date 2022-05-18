import * as React from 'react';
import { TextareaAutosize,Box,Container,TextField,Button } from '@mui/material';
import { useForm } from 'react-hook-form';


const IVAllocation = () => {

    const {register,handleSubmit} = useForm()

    const onSubmit = (data) =>{
        console.log(data)
    }

    return (
        <div className = "mt-5">
            <h1>SHOPKEEPER ALLOCATION</h1>
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
            label = "ShopKeeper's Address"
            fullWidth
            autoFocus
            {...register("shopkeeperAddress", { required: true, maxLength: 20 })}
          />
        </Box>
        <Box mb = {2}>
            <TextField
            type = "number" 
            variant = "outlined"
            label = "Wheat"
            fullWidth
            autoFocus
            {...register("wheat", { required: true, maxLength: 20 })}
            />
        </Box>
        <Box mb = {2}>
            <TextField 
            type = "number"
            variant = "outlined"
            label = "Rice"
            fullWidth
            autoFocus
            {...register("rice", { required: TextareaAutosize, maxLength: 20 })}
            />
        </Box>
        <Box mb = {2}>
            <TextField 
            type = "number"
            variant = "outlined"
            label = "Kerosine"
            fullWidth
            autoFocus
            {...register("kerosine", { required: true, maxLength: 20 })}
            />
        </Box>
      </form>
      <Button type = "submit" variant = "contained" color = "primary" onClick = {handleSubmit(onSubmit)} >Submit</Button>
    </Container>
    </div>
    )
}

export default IVAllocation;