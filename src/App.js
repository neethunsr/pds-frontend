import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import RegisterPage from "./Register";
import IMAllocation from "./IMAllocation";
import SKAllocation from "./SKAllocation";
import BlockRegister from "./BlockchainRegister";
import Footer from "./components/Footer";
// import Login from "./Login";
import Header from "./components/Header";
// import contract from "./rds";
import AdminPage from "./AdminPage";
import ViewTransaction from "./ViewTr";
import { ToastContainer } from "react-toastify";
import StockData from "./StockData";
import SmartContractIntegration from "./SmartContractIntegration";
import HomePage from "./HomePage";
import About from "./About";

function App() {
	// console.log(contract.abi);
	return (
		<div className="App">
			{/* <Header /> */}
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
			<BrowserRouter>
				<Routes>
					<Route path="/signin" element={<SignIn />}></Route>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/imallocation" element={<IMAllocation />} />
					<Route path="/skallocation" element={<SKAllocation />} />
					<Route path="/blockregister" element={<BlockRegister />} />
					<Route path="/view" element={<ViewTransaction />} />
					<Route path="/stock" element={<StockData />} />
					<Route path="/smartcontract" element={<SmartContractIntegration />} />
				</Routes>
			</BrowserRouter>
			<Footer />
		</div>
	);
}

export default App;
