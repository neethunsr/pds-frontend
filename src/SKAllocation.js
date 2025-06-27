import React, { useEffect, useState } from "react";
import {
	Box,
	Container,
	TextField,
	Button,
	InputAdornment,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	ListSubheader,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Header from "./components/Header";
import { toast } from "react-toastify";
import { db } from "./firebase";
import firebase from "./firebase";
import {
	collection,
	query,
	where,
	getDocs,
	addDoc,
	Timestamp,
	doc,
} from "firebase/firestore";
import {
	Delete as DeleteIcon,
	Refresh as RefreshIcon,
} from "@mui/icons-material";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const SKAllocation = () => {
	const { register, handleSubmit, setValue, control } = useForm({
		defaultValues: {
			wheat: 0,
			rice: 0,
			kerosene: 0,
			date: new Date(),
		},
	});

	const [rationCards, setRationCards] = useState([]);
	const [filteredCards, setFilteredCards] = useState([]);
	const [allocations, setAllocations] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchShopId, setSearchShopId] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCard, setSelectedCard] = useState("");
	const [recentTransactions, setRecentTransactions] = useState([]);
	const [searchTxn, setSearchTxn] = useState("");
	const ref = firebase.firestore().collection("allocations");

	const onSubmit = async (data) => {
		try {
			const currentDate = new Date();
			const currentMonth = currentDate.getMonth(); // 0-indexed (0 = Jan)
			const currentYear = currentDate.getFullYear();

			// Query allocations with this rationCardNo
			const allocationsRef = collection(db, "allocations");
			const q = query(
				allocationsRef,
				where("rationCardNo", "==", data.rationCardNo)
			);

			const querySnapshot = await getDocs(q);

			let alreadyAllocated = false;

			querySnapshot.forEach((doc) => {
				const allocationDate = doc.data().date?.toDate?.();
				if (
					allocationDate &&
					allocationDate.getMonth() === currentMonth &&
					allocationDate.getFullYear() === currentYear
				) {
					alreadyAllocated = true;
				}
			});

			if (alreadyAllocated) {
				toast.warn("Ration already provided for the month");
				return;
			}

			// If not already allocated, add new allocation
			await addDoc(collection(db, "allocations"), {
				rationCardNo: data.rationCardNo,
				wheat: parseFloat(data.wheat),
				rice: parseFloat(data.rice),
				kerosene: parseFloat(data.kerosene),
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				date: Timestamp.fromDate(currentDate),
			});
			toast.success("Resource Allocated!");
		} catch (err) {
			console.error("Allocation error:", err);
			toast.error("An error occurred while allocating ration.");
		}
	};

	useEffect(() => {
		const fetchRationCards = async () => {
			// Fetch ration cards from Firestore
			const querySnapshot = await getDocs(collection(db, "ration_cards"));
			const cards = querySnapshot.docs.map((doc) => doc.data().ration_id);
			console.log(cards);
			setRationCards(cards);
			setFilteredCards(cards);
		};
		fetchRationCards(); // Fetch existing allocations on mount
	}, []);

	// Fetch last 10 transactions
	useEffect(() => {
		const fetchRecentTransactions = async () => {
			const allocationsRef = collection(db, "allocations");
			const q = query(allocationsRef);
			const querySnapshot = await getDocs(q);
			let txns = querySnapshot.docs
				.map((doc) => ({ id: doc.id, ...doc.data() }))
				.sort((a, b) => {
					const aTime = a.timestamp?.toDate?.() || a.date?.toDate?.() || 0;
					const bTime = b.timestamp?.toDate?.() || b.date?.toDate?.() || 0;
					return bTime - aTime;
				})
				.slice(0, 10);
			setRecentTransactions(txns);
		};
		fetchRecentTransactions();
	}, []);

	const handleSearchChange = (e) => {
		const value = e.target.value.toLowerCase();
		setSearchTerm(value);
		setFilteredCards(
			rationCards.filter((card) => card.toLowerCase().includes(value))
		);
	};

	const handleSelectChange = (event) => {
		setSelectedCard(event.target.value);
		setValue("rationCardNo", event.target.value);
	};

	const pages = [
		{ name: "HOME", link: "/", id: 1 },
		{ name: "ALLOCATE", link: "#", id: 2 },
		{ name: "VIEW TRANSACTIONS", link: "/view", id: 3 },
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
						width: "60%",
						minHeight: "600px",
						maxHeight: "90vh",
						padding: "5%",
						overflow: "visible",
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

							{/* Ration Card Dropdown with Search */}
							<Box mb={4}>
								<FormControl fullWidth>
									<InputLabel id="ration-card-label">
										Ration Card No.
									</InputLabel>
									<Select
										labelId="ration-card-label"
										value={selectedCard}
										onChange={handleSelectChange}
										label="Ration Card No."
										fullWidth
										MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
									>
										<ListSubheader>
											<TextField
												placeholder="Search..."
												fullWidth
												size="small"
												value={searchTerm}
												onChange={handleSearchChange}
												onKeyDown={(e) => e.stopPropagation()}
											/>
										</ListSubheader>

										{filteredCards.length > 0 ? (
											filteredCards.map((card) => (
												<MenuItem key={card} value={card}>
													{card}
												</MenuItem>
											))
										) : (
											<MenuItem disabled>No match found</MenuItem>
										)}
									</Select>
								</FormControl>
							</Box>

							{/* Date Picker */}
							<Box mb={4}>
								{/* <LocalizationProvider dateAdapter={AdapterDateFns}>
									<Controller
										name="date"
										control={control}
										render={({ field }) => (
											<DatePicker
												label="Select Date"
												value={field.value}
												onChange={(date) => field.onChange(date)}
												renderInput={(params) => (
													<TextField
														{...params}
														fullWidth
														color="success"
														focused
													/>
												)}
											/>
										)}
									/>
								</LocalizationProvider> */}
							</Box>

							{/* Commodities */}
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
									defaultValue={0}
									{...register("wheat", { required: true, maxLength: 4 })}
								/>
								<TextField
									type="number"
									color="success"
									variant="outlined"
									label="Rice"
									style={{ width: "100px" }}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">kg</InputAdornment>
										),
									}}
									focused
									defaultValue={0}
									{...register("rice", { required: true, maxLength: 4 })}
								/>
								<TextField
									type="number"
									variant="outlined"
									color="success"
									label="Kerosene"
									style={{ width: "150px" }}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">litres</InputAdornment>
										),
									}}
									focused
									defaultValue={0}
									{...register("kerosene", { required: true, maxLength: 3 })}
								/>
							</Box>

							<Button
								type="submit"
								variant="contained"
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

					{/* Recent Transactions Section */}
					<Box
						mt={6}
						style={{
							maxHeight: 300,
							overflowY: "auto",
							marginBottom: 24,
						}}
					>
						<Typography
							variant="h6"
							style={{ color: "#17396B", marginBottom: 8 }}
						>
							Recent Transactions
						</Typography>
						<TextField
							label="Search by Ration Card No."
							variant="outlined"
							size="small"
							value={searchTxn}
							onChange={(e) => setSearchTxn(e.target.value)}
							style={{ marginBottom: 16, width: 250 }}
						/>
						{recentTransactions.filter(
							(txn) =>
								!searchTxn ||
								(txn.rationCardNo &&
									txn.rationCardNo
										.toLowerCase()
										.includes(searchTxn.toLowerCase()))
						).length === 0 ? (
							<Typography variant="body2" color="text.secondary">
								No transactions found
							</Typography>
						) : (
							recentTransactions
								.filter(
									(txn) =>
										!searchTxn ||
										(txn.rationCardNo &&
											txn.rationCardNo
												.toLowerCase()
												.includes(searchTxn.toLowerCase()))
								)
								.map((txn) => (
									<Card
										key={txn.id}
										style={{
											marginBottom: 10,
											border: "1px solid #e0e0e0",
										}}
									>
										<CardContent style={{ padding: 12 }}>
											<Typography
												variant="subtitle2"
												style={{
													fontWeight: "bold",
													color: "#17396B",
												}}
											>
												Ration Card: {txn.rationCardNo}
											</Typography>
											<Typography variant="body2">
												<strong>Wheat:</strong> {txn.wheat}kg |{" "}
												<strong>Rice:</strong> {txn.rice}kg |{" "}
												<strong>Kerosene:</strong> {txn.kerosene}L
											</Typography>
											<Typography variant="caption" color="text.secondary">
												Date:{" "}
												{txn.date?.toDate
													? txn.date.toDate().toLocaleDateString()
													: "-"}
											</Typography>
										</CardContent>
									</Card>
								))
						)}
					</Box>
				</div>
			</div>
		</>
	);
};

export default SKAllocation;
