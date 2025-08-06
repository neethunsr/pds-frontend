import { Container, Box, Typography, Paper, Button } from "@mui/material";
import Header from "./components/Header";

function HomePage() {
  const pages = [
    { name: "SIGN IN", link: "/signin", id: 1 },
    { name: "REGISTER", link: "/register", id: 2 },
    { name: "ABOUT US", link: "/about", id: 3 },
    { name: "VIEW ALLOCATIONS", link: "/viewim", id: 4 },
  ];
  return (
    <>
      <Header pages={pages} log={false} />
      <Box
        sx={{
          backgroundImage: "url(/bg.svg)",
          minHeight: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={6} sx={{ p: 5, borderRadius: 4, opacity: 0.97 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="primary"
              gutterBottom
              align="center"
            >
              Blockchain-based Public Distribution System
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              align="center"
              gutterBottom
            >
              The lack of trust in centralized systems can be solved using
              blockchain implementation.
            </Typography>
            <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
              Integrating blockchain with critical government institutions
              brings trust, security, transparency, and traceability.
              Blockchain, being a distributed hyper-ledger, provides an
              immutable ledger for storing all transactions. These transactions
              cannot be modified by anyone. Anyone who attempts to modify the
              block disrupts the entire network.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              A web-based portal is used to track all the transactions that have
              taken place. The interface helps all customers to view all the
              transactions and verify them. Traceability is another important
              advantage of this implementation.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              This system will also help to cut costs significantly in a
              time-saving manner due to digitization of the process with utmost
              transparency and auditability. The web portal allows the customers
              to view their ration allocation and to check if they have bought
              the allocated commodities for a particular month.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="/signin"
              >
                Get Started
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;
