import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Layout from "./layout/Layout";
import UserContextProvider from "./context/UserContext";
import Places from "./pages/Places";
import PlacesForm from "./components/PlacesForm";

function App() {
	return (
		<UserContextProvider>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/account" element={<Profile />} />
					<Route path="/account/places" element={<Places />} />
					<Route path="/account/places/new" element={<PlacesForm />} />
					<Route path="/account/places/:placeId" element={<PlacesForm />} />
				</Route>
			</Routes>
		</UserContextProvider>
	);
}

export default App;
