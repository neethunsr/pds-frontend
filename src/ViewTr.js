import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "./components/Header";

function ViewTransaction() {
  const pages = [
    {
      name: "HOME",
      link: "/",
      id: 1,
    },
    {
      name: "APPROVE",
      link: "#",
      id: 2,
    },
    {
      name: "ALLOCATE",
      link: "#",
      id: 4,
    },
    {
      name: "VIEW TRANSACTIONS",
      link: "/view",
      id: 3,
    },
  ];
  return (
    <>
      {" "}
      <Header pages={pages} log={true} />
      <h2 style={{ marginTop: "50px" }}>VIEW TRANSACTIONS</h2>
      <div className="w-responsive text-center mx-auto p-5 mt-3">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography color="primary">
              0x4e2e7b8e90ca75a316485c71626d817c965d78ec851b1b7842ac69372a04bedc
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              STATUS : COMPLETED <br />
              <br />
              FROM : 0x488005944a24c674b145f20ee89aa72d1b97a2c4 <br />
              <br />
              TO : 0x36fb397bef608f78ff5b86f4a9952bbabcb18f09 <br />
              <br />
              TRANSACTION FEE : 0.000400508705819512 Ether ($0.00)
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography color="primary">
              0x6c1cc37e0c671737f73fcfd030b01910e305557c1f10b8a549051b949a137223
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              STATUS : COMPLETED <br />
              <br />
              FROM : 0x488005944a24c674b145f20ee89aa72d1b97a2c4 <br />
              <br />
              TO : 0x36fb397bef608f78ff5b86f4a9952bbabcb18f09 <br />
              <br />
              TRANSACTION FEE : 0.000357048750097464 Ether ($0.00)
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography color="primary">
              0x5fe650cd71750a776c529e6f882c8717ae7713c2c564721891c713633c18ec71
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              STATUS : COMPLETED <br />
              <br />
              FROM : 0x488005944a24c674b145f20ee89aa72d1b97a2c4 <br />
              <br />
              TO : 0x36fb397bef608f78ff5b86f4a9952bbabcb18f09 <br />
              <br />
              TRANSACTION FEE : 0.000400508705819512 Ether ($0.00)
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}

export default ViewTransaction;
