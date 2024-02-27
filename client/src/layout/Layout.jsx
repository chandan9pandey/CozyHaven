import React from "react";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="py-4 px-8 flex flex-col min-h-screen max-w-7xl mx-auto">
			<Header />
			<Outlet />
		</div>
	);
};

export default Layout;
