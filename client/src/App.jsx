import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./layout/Layout";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Route>
		</Routes>
	);
}

export default App;
