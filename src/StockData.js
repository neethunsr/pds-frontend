import React from "react";
import Header from "./components/Header";
import Button from "@mui/material/Button";
import { useState } from "react";
import { TextField } from "@mui/material";

function StockData() {
  const pages = [
    {
      name: "HOME",
      link: "/",
      id: 1,
    },
    {
      name: "ALLOCATE",
      link: "#",
      id: 2,
    },
    {
      name: "VIEW TRANSACTIONS",
      link: "/view",
      id: 3,
    },
  ];
  const [show, setshow] = useState(false);

  const buttonActionIM = () => {
    setshow(true);
  };
  const buttonActionSK = () => {
    setshow(true);
  };
  return (
    <>
      <Header pages={pages} log={true} />
      <div
        style={{
          //   backgroundImage: "url(/bg.svg)",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          margin="normal"
          color="success"
          required
          // fullWidth
          id="address"
          label="Enter metamask address"
          name="address"
          style={{
            // background: "#17396B",
            margin: "20px",
          }}
          // autoComplete="email"
          autoFocus
          // onChange={}
        />
        <Button
          type="submit"
          // fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          // onClick={getOTP}
          style={{
            background: "#17396B",
            margin: "20px",
          }}
          id="sign-in-button"
          onClick={buttonActionSK}
        >
          Inventory Manager
        </Button>
        <Button
          type="submit"
          // fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          // onClick={getOTP}
          style={{
            background: "#17396B",
            margin: "20px",
          }}
          onClick={buttonActionIM}
        >
          ShopKeeper
        </Button>

        {/* {isSK ? (
          <TextField
            margin="normal"
            color="success"
            required
            // fullWidth
            id="address"
            label="Enter metamask address"
            name="address"
            // autoComplete="email"
            autoFocus
            // onChange={}
          />
        ) : (
          <TextField
            margin="normal"
            color="success"
            required
            // fullWidth
            label="Enter metamask address"
            name="address"
            // autoComplete="email"
            autoFocus
            // onChange={}
          />
        )} */}
      </div>
      {show && (
        <div style={{ marginBottom: "100px" }}>
          <h4>License No.</h4>
          <h4>Wheat</h4>
          <h4>Rice</h4>
          <h4>Kerosene</h4>
        </div>
      )}
    </>
  );
}

export default StockData;
