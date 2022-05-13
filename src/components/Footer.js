import React from "react";
import { Box, Grid } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";

function Footer() {
	return (
		<Box style={{ position: "relative" }}>
			<Box
				style={{ backgroundColor: "#17396B", color: "#ffffff", padding: "5%" }}
			>
				<Grid
					container
					spacing={2}
					justifyContent="center"
					flexWrap="noWrap"
					style={{ overflowX: "auto", width: "100%" }}
				>
					<Grid item xs={4}>
						<h4>Food Supply Chain</h4>
						<p>
							Trafalgar provides progressive and affordable
							healthcare,accessible on mobile and online for everyone
						</p>
						<p>
							<CopyrightIcon /> Sikkim University 2020.All rights reserved
						</p>
					</Grid>
					<Grid item xs={4}>
						<h4>Useful Links</h4>
						<p>About</p>
						<p>Testimonials</p>
						<p>Find A Doctor</p>
						<p>Apps</p>
					</Grid>
					<Grid item xs={4}>
						<h4>Contact Us</h4>
						<p>Samdur,P.O,Tadong,GangTok,Sikkim 737102</p>
						<p>info@cus.ac.in</p>
						<p>+91 XXXXXXXXXX</p>
						<p>+91 XXXXXXXXXX</p>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export default Footer;
