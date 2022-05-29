import React from "react";
import { Box, Grid } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

function Footer() {
  return (
    <Box style={{ position: "relative" }}>
      <Box
        style={{ backgroundColor: "#17396B", color: "#ffffff", padding: "5%" }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          flexWrap="noWrap"
          style={{ overflowX: "auto", width: "100%" }}
        >
          <Grid item xs={4}>
            <h4>Food Supply Chain</h4>
            <p>
              Supply Chain management using blockchain for public distribution
              system
            </p>
            <p>
              <CopyrightIcon /> 2022 | All rights reserved
            </p>
          </Grid>
          <Grid item xs={4}>
            <h4>Useful Links</h4>
            <p>About</p>
            <p>Allocations</p>
            <p>Find A Ration Shop</p>
            <p>FAQs</p>
          </Grid>
          <Grid item xs={4}>
            <h4>Contact Us</h4>
            <p>rcmskerala@gmail.com</p>
            <p>1967</p>
            <p>+91 XXXXXXXXXX</p>
            <p>+91 XXXXXXXXXX</p>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Footer;
