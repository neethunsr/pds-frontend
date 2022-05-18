import React from 'react';
import "./App.css";
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import SignIn from "./SignIn";
import RegisterPage from './Register'
import IMAllocation from './IMAllocation'
import SKAllocation from './SKAllocation'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path = "/" element = {<SignIn/>}>
					</Route>
					<Route path = "/register" element = {<RegisterPage/>} /> 
					<Route path = "/ivallocation" element = {<IMAllocation/>} /> 
					<Route path = "/spallocation" element = {<SKAllocation/>} />
					</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

