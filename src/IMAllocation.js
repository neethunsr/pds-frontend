import * as React from "react";
import {
	TextareaAutosize,
	Box,
	Container,
	TextField,
	Button,
	InputAdornment,
	Card,
	CardContent,
	Typography,
	IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Delete as DeleteIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import Header from "./components/Header";
import { toast } from "react-toastify";
import firebase from "./firebase";

// What if an im allocates to a shop not under them????

const IVAllocation = () => {
	const { register, handleSubmit, reset } = useForm();
	const [allocations, setAllocations] = useState([]);
	const [loading, setLoading] = useState(false);
	const ref = firebase.firestore().collection("ration_allocations");

	// Fetch allocations from Firestore
	const fetchAllocations = async () => {
		setLoading(true);
		try {
			const snapshot = await ref.orderBy("timestamp", "desc").get();
			const allocationData = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setAllocations(allocationData);
		} catch (error) {
			console.error("Error fetching allocations:", error);
			toast.error("Failed to fetch allocations");
		} finally {
			setLoading(false);
		}
	};

	// Load allocations on component mount
	useEffect(() => {
		fetchAllocations();
	}, []);

	// Add allocation to Firestore
	const onSubmit = async (data) => {
		setLoading(true);
		try {
			const allocationData = {
				shopNo: parseInt(data.shopNo),
				wheat: parseInt(data.wheat),
				rice: parseInt(data.rice),
				kerosene: parseInt(data.kerosene),
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				allocatedBy: "IM", // You can make this dynamic based on logged-in user
				date: new Date().toLocaleDateString()
			};

			await ref.add(allocationData);
			toast.success("Resource Allocated Successfully!");
			reset(); // Reset form
			fetchAllocations(); // Refresh the list
		} catch (error) {
			console.error("Error adding allocation:", error);
			toast.error("Failed to allocate resources");
		} finally {
			setLoading(false);
		}
	};

	// Remove allocation from Firestore
	const removeAllocation = async (id) => {
		if (window.confirm("Are you sure you want to remove this allocation?")) {
			setLoading(true);
			try {
				await ref.doc(id).delete();
				toast.success("Allocation removed successfully!");
				fetchAllocations(); // Refresh the list
			} catch (error) {
				console.error("Error removing allocation:", error);
				toast.error("Failed to remove allocation");
			} finally {
				setLoading(false);
			}
		}
	};
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
	return (
		<>
			<Header pages={pages} log={true} />
			<div
				style={{
					backgroundImage: "url(/bg.svg)",
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
						width: "70%",
						minHeight: "700px",
						maxHeight: "90vh",
						padding: "3%",
						overflowY: "auto",
					}}
				>
					<h1>Ration Allocation</h1>
					<Container maxWidth="xs">
						<form>
							<Box
								sx={{
									marginTop: 8,
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
									label="Enter Shop No."
									// rows={4}
									// multiline
									focused
									fullWidth
									autoFocus
									{...register("shopNo", {
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
						</form>
						<Button
							type="submit"
							variant="contained"
							disabled={loading}
							style={{
								background: "#17396B",
								opacity: loading ? "50%" : "100%",
								margin: "30px 0",
							}}
							onClick={handleSubmit(onSubmit)}
						>
							{loading ? "Processing..." : "Allocate Resources"}
						</Button>
						<Button
							variant="outlined"
							startIcon={<RefreshIcon />}
							onClick={fetchAllocations}
							disabled={loading}
							style={{
								marginLeft: "10px",
								color: "#17396B",
								borderColor: "#17396B",
							}}
						>
							Refresh
						</Button>
					</Container>

					{/* Display existing allocations */}
					<div style={{ marginTop: "30px", maxHeight: "300px", overflowY: "auto" }}>
						<Typography variant="h6" style={{ marginBottom: "15px", color: "#17396B" }}>
							Recent Allocations
						</Typography>
						{allocations.length === 0 ? (
							<Typography variant="body2" style={{ textAlign: "center", color: "#666" }}>
								No allocations found
							</Typography>
						) : (
							allocations.map((allocation) => (
								<Card 
									key={allocation.id} 
									style={{ 
										marginBottom: "10px", 
										border: "1px solid #e0e0e0",
										boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
									}}
								>
									<CardContent style={{ padding: "12px", position: "relative" }}>
										<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
											<div>
												<Typography variant="subtitle2" style={{ fontWeight: "bold", color: "#17396B" }}>
													Shop No: {allocation.shopNo}
												</Typography>
												<Typography variant="body2" style={{ margin: "5px 0" }}>
													<strong>Wheat:</strong> {allocation.wheat}kg | 
													<strong> Rice:</strong> {allocation.rice}kg | 
													<strong> Kerosene:</strong> {allocation.kerosene}L
												</Typography>
												<Typography variant="caption" style={{ color: "#666" }}>
													Date: {allocation.date} | By: {allocation.allocatedBy}
												</Typography>
											</div>
											<IconButton
												onClick={() => removeAllocation(allocation.id)}
												disabled={loading}
												style={{ color: "#d32f2f", padding: "4px" }}
												title="Remove allocation"
											>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</div>
									</CardContent>
								</Card>
							))
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default IVAllocation;
