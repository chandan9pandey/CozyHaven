import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const Header = () => {
	const { user } = useContext(UserContext);
	return (
		<header className="flex justify-between">
			<a href="" className="flex items-center ">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-10 h-10"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
					/>
				</svg>
				<span className="text-2xl  px-5 font-bold">CozyHaven</span>
			</a>
			<div className=" flex space-x-5 border border-grey-300 shadow-md shadow-gray-300 rounded-full py-2 px-4">
				<div>Anywhere</div>
				<div className="border-l border-gray-300"></div>
				<div>Any Week</div>
				<div className="border-l border-gray-300"></div>
				<div className="flex items-center justify-between">Add Guests</div>
				<button className="text-white bg-primary rounded-full p-1">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-4 h-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
						/>
					</svg>
				</button>
			</div>
			<Link
				to={user ? "/account" : "/login"}
				className="flex space-x-2 border border-grey-300 shadow-md shadow-gray-300 rounded-full py-2 px-4 items-center "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
				<div className="bg-gray-500 text-white border border-gray-500 rounded-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6 overflow-hidden"
					>
						<path
							fillRule="evenodd"
							d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				{!!user && <div className="text-green-500 font-bold">{user}</div>}
			</Link>
		</header>
	);
};
