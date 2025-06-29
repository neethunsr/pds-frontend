import { TextField, Button, Container, Box, Avatar } from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import firebase from "./firebase";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
	const [license, setlicense] = useState("");
	const [name, setname] = useState("");
	const [address, setaddress] = useState("");
	const [phone, setphone] = useState("");
	const ref = firebase.firestore().collection("users");
	const approval = false; // Default approval status

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		if (id === "license") {
			setlicense(value);
		}
		if (id === "name") {
			setname(value);
		}
		if (id === "address") {
			setaddress(value);
		}
		if (id === "phone") {
			setphone(value);
		}
	};
	function createDoc(newDataObj) {
		ref
			.doc()
			.set(newDataObj)
			.catch((err) => {
				console.log(err);
			});
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!license || !name || !address || !phone) {
			toast.error("Please fill in all fields before submitting.");
			return;
		}
		console.log(license, name, address, phone);
		createDoc({ license, name, phone, address, approval });
		toast.success("User registered successfully! Redirecting to Sign In...");
		setTimeout(() => {
			window.location.href = "/signin";
		}, 1500);
	};

	const pages = [
		{
			name: "HOME",
			link: "/",
			id: 1,
		},
		{
			name: "ABOUT US",
			link: "/about",
			id: 3,
		},
		{
			name: "SIGN IN",
			link: "/signin",
			id: 2,
		},
	];
	return (
		<div>
			<Header pages={pages} log={false} />
			<Container maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						paddingBottom: "30px",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "#17396B" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						New User Registration
					</Typography>
				</Box>
				<Box component="form" noValidate sx={{ mt: 1 }}>
					<Box mb={2}>
						<TextField
							variant="outlined"
							label="License No."
							color="success"
							id="license"
							fullWidth
							onChange={handleInputChange}
							autoFocus
							value={license}
							// {...register("UserId", { required: true, maxLength: 20 })}
							on
						/>
					</Box>
					<Box mb={2}>
						<TextField
							variant="outlined"
							color="success"
							label="Name"
							id="name"
							fullWidth
							autoFocus
							value={name}
							onChange={handleInputChange}
							// {...register("name", { required: true, maxLength: 20 })}
						/>
					</Box>
					<Box mb={2}>
						<TextField
							color="success"
							variant="outlined"
							label="MetaMask Address"
							id="address"
							fullWidth
							autoFocus
							value={address}
							onChange={handleInputChange}
							// {...register("metaAddress", { required: true, maxLength: 20 })}
						/>
					</Box>
					<Box>
						<TextField
							variant="outlined"
							color="success"
							label="Phone Number"
							id="phone"
							fullWidth
							autoFocus
							value={phone}
							onChange={handleInputChange}
							// {...register("phoneNumber", { required: true, maxLength: 20 })}
						/>
					</Box>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						style={{
							background: "#17396B",
							margin: "40px 0",
						}}
					>
						Submit
					</Button>
					<ToastContainer />
				</Box>
			</Container>
		</div>
	);
};

export default RegisterPage;
