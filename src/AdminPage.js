import * as React from "react";
import Header from "./components/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import app from "./firebase";
import * as XLSX from "xlsx";

function AdminCard(props) {
	// const [status, setStatus] = React.useState(props.status);
	const handleApprove = async () => {
		if (!window.confirm(`Are you sure you want to approve ${props.name}?`))
			return;
		try {
			await app
				.firestore()
				.collection("users")
				.doc(props.docId)
				.update({ approval: true });
			// setStatus("Approved");
			toast.success(`Approved ${props.uid}!`, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			toast.error("Error approving user");
		}
	};
	const handleCancel = async () => {
		if (!window.confirm(`Are you sure you want to delete ${props.uid}?`))
			return;
		try {
			await app.firestore().collection("users").doc(props.docId).delete();
			// setStatus("Cancelled");
			toast.error(`Cancelled ${props.uid}!`, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			toast.error("Error deleting user");
		}
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

			<CardActions style={{ display: "flex", justifyContent: "space-around" }}>
				<Button color="success" size="small" onClick={handleApprove}>
					Approve
				</Button>
				<Button color="warning" size="small" onClick={handleCancel}>
					Cancel
				</Button>
			</CardActions>
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
	const ref = app.firestore().collection("users");
	const rationCardsRef = app.firestore().collection("ration_cards");
	const [data, setData] = useState([]);
	const [excelFile, setExcelFile] = useState(null);

	const handleExcelChange = (e) => {
		const file = e.target.files[0];
		setExcelFile(file);
	};

	const handleExcelUpload = async () => {
		if (!excelFile) {
			toast.error("Please select an Excel file first.");
			return;
		}
		const reader = new FileReader();
		reader.onload = async (evt) => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_json(ws);
			for (const row of data) {
				if (row.ration_id && row.name && row.place) {
					await rationCardsRef.add({
						ration_id: row.ration_id,
						name: row.name,
						place: row.place,
					});
				}
			}
			toast.success("Excel data uploaded to Firestore!");
		};
		reader.readAsBinaryString(excelFile);
	};

	React.useEffect(() => {
		const unsubscribe = ref.onSnapshot((querySnapshot) => {
			const items = [];
			querySnapshot.forEach((doc) => {
				const userData = doc.data();
				if (userData.approval !== true) {
					items.push({ ...userData, docId: doc.id });
				}
			});
			setData(items);
		});
		return () => unsubscribe();
	}, []);
	console.log("data", data);
	return (
		<div style={{ marginBottom: "50px" }}>
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
			<Box mt={5} mb={3}>
				<Typography variant="h6">Upload Ration Cards Excel</Typography>
				<input
					type="file"
					accept=".xlsx, .xls"
					onChange={handleExcelChange}
					style={{ margin: "10px 0" }}
				/>
				<Button variant="contained" color="primary" onClick={handleExcelUpload}>
					Upload Excel
				</Button>
			</Box>
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
				{data.map((user) => (
					<AdminCard
						type="Approve"
						address={user.address}
						uid={user.license}
						name={user.name}
						place="Trivandrum"
						status=""
						docId={user.docId}
					/>
				))}
			</div>
		</div>
	);
}

export default AdminPage;
