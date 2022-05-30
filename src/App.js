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
import contract from "./rds";

function App() {
  console.log(contract.abi);
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/imallocation" element={<IMAllocation />} />
          <Route path="/skallocation" element={<SKAllocation />} />
          <Route path="/blockregister" element={<BlockRegister />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
