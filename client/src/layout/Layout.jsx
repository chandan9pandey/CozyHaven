import React from "react";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="py-4 px-8 flex flex-col max-w-7xl mx-auto justify-center ">
				<Header />
				<Outlet />
				<hr className="bg-gray-300 h-1/3 my-5 max-w-full " />
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
