import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";

const Places = () => {
	const [places, setPlaces] = useState([]);

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

	useEffect(() => {
		if (localStorage.getItem("auth-token")) {
			axios
				.get(`${baseUrl.concat("user-places")}`, {
					headers: {
						Accept: "application/json",
						"auth-token": `${localStorage.getItem("auth-token")}`,
						"Content-Type": "application/json",
					},
				})
				.then(({ data }) => {
					setPlaces(data);
				});
		}
	}, []);
	return (
		<div>
			<AccountNav />

			<div className="text-center">
				<Link
					className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
					to={"/account/places/new"}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
							clipRule="evenodd"
						/>
					</svg>
					Add new place
				</Link>
			</div>
			<div className="mt-4">
				{places.length > 0 &&
					places.map((place) => (
						<Link
							to={"/account/places/" + place._id}
							className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
							key={place}
						>
							<div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
								<img
									src={`${baseUrl.concat("uploads/").concat(place.photos[0])}`}
									alt=""
								/>
							</div>
							<div className="grow-0 shrink">
								<h2 className="text-xl">{place.title}</h2>
								<p className="text-sm mt-2">{place.description}</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Places;