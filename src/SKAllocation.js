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
import { collection, getDocs } from "firebase/firestore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCard, setSelectedCard] = useState("");

	const onSubmit = (data) => {
		console.log(data);
		toast.success("Resource Allocated!");
	};

	useEffect(() => {
		const fetchRationCards = async () => {
			const querySnapshot = await getDocs(collection(db, "ration_cards"));
			const cards = querySnapshot.docs.map((doc) => doc.id);
			setRationCards(cards);
			setFilteredCards(cards);
		};
		fetchRationCards();
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
								<LocalizationProvider dateAdapter={AdapterDateFns}>
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
								</LocalizationProvider>
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
				</div>
			</div>
		</>
	);
};

export default SKAllocation;
