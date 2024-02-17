import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import UserContextProvider from "./context/UserContext";

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
			</Routes>
		</UserContextProvider>
	);
}

export default App;
