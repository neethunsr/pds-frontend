import * as React from "react";
import {
  TextareaAutosize,
  Box,
  Container,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";

const IVAllocation = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div
      style={{
        // backgroundImage: "url(/bg.png)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          opacity: "90%",
          margin: "auto",
          width: "60%",
          height: "600px",
          padding: "5%",
        }}
      >
        <h1>Customer Allocation</h1>
        <Container maxWidth="xs">
          <form>
            <Box
              sx={{
                marginTop: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></Box>
            <Box mb={4}>
              <TextField
                type="number"
                variant="outlined"
                color="success"
                label="Enter Ration Card No."
                // rows={4}
                // multiline
                focused
                fullWidth
                autoFocus
                {...register("rationCardNo", {
                  required: true,
                  maxLength: 20,
                })}
                // style={{ backgroundColor: "#E5E5E5" }}
              />
            </Box>
            <Box mb={4}>
              <TextField
                type="number"
                variant="outlined"
                color="success"
                label="Month"
                // rows={4}
                // multiline
                focused
                autoFocus
                {...register("rationCardNo", {
                  required: true,
                  maxLength: 20,
                })}
                // style={{ backgroundColor: "#E5E5E5" }}
              />
            </Box>
            <Box
              mb={2}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <TextField
                style={{ width: "100px" }}
                type="number"
                variant="outlined"
                label="Wheat"
                color="success"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                focused
                autoFocus
                {...register("wheat", { required: true, maxLength: 4 })}
              />
              <TextField
                type="number"
                color="success"
                variant="outlined"
                label="Rice"
                style={{ width: "100px" }}
                focused
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                autoFocus
                {...register("rice", {
                  required: TextareaAutosize,
                  maxLength: 4,
                })}
              />
              <TextField
                type="number"
                variant="outlined"
                color="success"
                label="Kerosene"
                style={{ width: "150px" }}
                focused
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">litres</InputAdornment>
                  ),
                }}
                autoFocus
                {...register("kerosene", { required: true, maxLength: 3 })}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              // color="primary"
              style={{
                background: "#17396B",
                opacity: "100%",
                margin: "50px 0",
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Allocate Resources
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default IVAllocation;
