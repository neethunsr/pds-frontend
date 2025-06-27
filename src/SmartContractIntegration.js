// SmartContractIntegration.js
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ShopTransactionABI from "./blockchain/ShopTransactionABI.json";
import Header from "./components/Header";
import {
	Box,
	Container,
	Typography,
	TextField,
	Select,
	MenuItem,
	Button,
	FormControl,
	InputLabel,
	Paper,
} from "@mui/material";

const CONTRACT_ADDRESS = "0x93C4d73982Ac3d035ad46069592F175486A6e608";
const SEPOLIA_CHAIN_ID = "0xaa36a7";

export default function SmartContractIntegration() {
	const [web3, setWeb3] = useState(null);
	const [account, setAccount] = useState(null);
	const [contract, setContract] = useState(null);
	const [action, setAction] = useState("sell");
	const [item, setItem] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [status, setStatus] = useState("");

	useEffect(() => {
		const init = async () => {
			if (window.ethereum) {
				try {
					// Switch to Sepolia network
					await window.ethereum.request({
						method: "wallet_switchEthereumChain",
						params: [{ chainId: SEPOLIA_CHAIN_ID }],
					});

					const web3Instance = new Web3(window.ethereum);
					await window.ethereum.request({ method: "eth_requestAccounts" });
					const accounts = await web3Instance.eth.getAccounts();

					const shopContract = new web3Instance.eth.Contract(
						ShopTransactionABI,
						CONTRACT_ADDRESS
					);

					setWeb3(web3Instance);
					setAccount(accounts[0]);
					setContract(shopContract);
				} catch (error) {
					console.error(
						"Error connecting to MetaMask or switching network",
						error
					);
				}
			} else {
				alert("Please install MetaMask to use this feature.");
			}
		};

		init();
	}, []);

	const handleTransaction = async () => {
		if (!contract || !account) return;

		try {
			setStatus("Processing transaction...");
			await contract.methods
				.recordTransaction(action, item, quantity)
				.send({ from: account });
			setStatus("Transaction recorded successfully.");
		} catch (err) {
			console.error("Transaction failed:", err);
			setStatus("Transaction failed.");
		}
	};

	const pages = [
		{ name: "HOME", link: "/", id: 1 },
		{ name: "ALLOCATE", link: "#", id: 2 },
		{ name: "VIEW TRANSACTIONS", link: "/view", id: 3 },
	];

	return (
		<>
			<Header pages={pages} log={true} />
			<Container maxWidth="sm" sx={{ mt: 6, mb: 4 }}>
				<Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						Shopkeeper Blockchain Transactions
					</Typography>
					<Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
						<FormControl fullWidth sx={{ mb: 3 }}>
							<InputLabel id="action-label">Action</InputLabel>
							<Select
								labelId="action-label"
								id="action"
								value={action}
								label="Action"
								onChange={(e) => setAction(e.target.value)}
							>
								<MenuItem value="sell">Sell</MenuItem>
								<MenuItem value="restock">Restock</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label="Item"
							variant="outlined"
							fullWidth
							sx={{ mb: 3 }}
							value={item}
							onChange={(e) => setItem(e.target.value)}
						/>
						<TextField
							label="Quantity"
							variant="outlined"
							type="number"
							fullWidth
							sx={{ mb: 3 }}
							value={quantity}
							onChange={(e) => setQuantity(Number(e.target.value))}
						/>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={handleTransaction}
							disabled={!contract || !account}
						>
							Submit Transaction
						</Button>
						{status && (
							<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
								{status}
							</Typography>
						)}
					</Box>
				</Paper>
			</Container>
		</>
	);
}
