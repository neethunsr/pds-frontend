import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import Header from "./components/Header";

function About() {
	const pages = [
		{ name: "HOME", link: "/", id: 1 },
		{ name: "SIGN IN", link: "/signin", id: 2 },
		{ name: "REGISTER", link: "/register", id: 3 },
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
					<Paper elevation={6} sx={{ p: 5, borderRadius: 3, opacity: 0.97 }}>
						<Typography
							variant="h4"
							fontWeight="bold"
							color="primary"
							gutterBottom
							align="center"
						>
							About This Project
						</Typography>
						<Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
							This web application is a blockchain-based Public Distribution
							System (PDS) designed to bring trust, transparency, and
							traceability to the distribution of essential commodities. By
							leveraging blockchain technology, the system ensures that all
							transactions are securely recorded on an immutable ledger, making
							them tamper-proof and auditable by anyone.
						</Typography>
						<Typography variant="body1" sx={{ mb: 2 }}>
							The platform enables customers to view their ration allocations,
							track their purchase history, and verify the authenticity of every
							transaction. Government authorities and shopkeepers benefit from
							streamlined processes, reduced fraud, and improved accountability.
						</Typography>
						<Typography variant="body1" sx={{ mb: 2 }}>
							Key features include:
						</Typography>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								width: "100%",
							}}
						>
							<ul
								style={{
									display: "inline-block",
									textAlign: "left",
									margin: 0,
								}}
							>
								<li>Immutable blockchain ledger for all transactions</li>
								<li>Customer portal for viewing allocations and purchases</li>
								<li>Real-time traceability and transparency</li>
								<li>Enhanced security and fraud prevention</li>
								<li>Digitized, time-saving, and cost-effective processes</li>
							</ul>
						</Box>
						<Typography
							variant="body2"
							color="text.secondary"
							align="center"
							sx={{ mt: 4 }}
						>
							Developed by a passionate team to modernize and secure the public
							distribution system for everyone.
						</Typography>
					</Paper>
				</Container>
			</Box>
		</>
	);
}

export default About;
