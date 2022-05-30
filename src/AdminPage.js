import * as React from "react";
import Header from "./components/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminCard(props) {
  const [status, setStatus] = React.useState(props.status);
  const handleApprove = () => {
    setStatus("Approved");
    toast.success(`Approved ${props.uid}!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleCancel = () => {
    setStatus("Cancelled");
    toast.error(`Cancelled ${props.uid}!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <Card sx={{ maxWidth: 475, minWidth: "maxContent" }} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.type}
        </Typography>
        <Typography variant="h5" component="div">
          {props.uid}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.place}
        </Typography>
        <Typography variant="body2">
          {props.name}
          <br />
          {props.address}
        </Typography>
      </CardContent>
      {props.status === "Approved" ||
      status === "Approved" ||
      status === "Cancelled" ? (
        <Button color="secondary" size="small">
          {status}
        </Button>
      ) : (
        <CardActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button color="success" size="small" onClick={handleApprove}>
            Approve
          </Button>
          <Button color="warning" size="small" onClick={handleCancel}>
            Cancel
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
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
    name: "VIEW TRANSACTIONS",
    link: "/view",
    id: 3,
  },
];
function AdminPage() {
  return (
    <div>
      <Header pages={pages} log={true} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 style={{ margin: "50px" }}>Admin Approvals</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "20px",
          padding: "20px",
        }}
      >
        <AdminCard
          type="Approve Inventory Manager"
          address="0x36fB397bEf608f78Ff5b86F4a9952Bba09BcB18F"
          uid="IM1024"
          name="John Doe"
          place="Trivandrum"
          status=""
        />
        <AdminCard
          type="Approve Shopkeeper"
          address="0x08f78Ff5b86F4a9952BbaBcB36fB397bEf618F09"
          uid="SK3875"
          name="Mohan K"
          place="Kazhakootam"
          status=""
        />
        <AdminCard
          type="Approve Shopkeeper"
          address="0xf78Ff5b836fB397bEf60862BbaBcB18F09F4a995"
          uid="SK1369"
          name="Alice Stuart"
          place="Sreekaryam"
          status="Approved"
        />
      </div>
    </div>
  );
}

export default AdminPage;
