import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid } from "react-loader-spinner";

const Home = () => {
	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url
	const [places, setPlaces] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		axios
			.get(`${baseUrl.concat("places")}`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then(({ data }) => {
				setPlaces(data);
				setLoading(false);
			});
	}, []);
	return (
		<>
			{loading ? (
				<div className="h-screen flex items-center justify-center">
					<Grid
						visible={true}
						height="90"
						width="90"
						color="#F5385D"
						ariaLabel="grid-loading"
						radius="12.5"
						wrapperStyle={{}}
						wrapperClass="grid-wrapper"
					/>
				</div>
			) : (
				<div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
					{places.length > 0 &&
						places.map((place) => (
							<Link to={"/place/" + place._id} key={place._id}>
								<div className="bg-gray-500 mb-2 rounded-2xl flex">
									{place.photos?.[0] && (
										<img
											className="rounded-2xl object-cover aspect-square"
											src={`${baseUrl
												.concat("uploads/")
												.concat(place.photos?.[0])}`}
											alt=""
										/>
									)}
								</div>
								<h2 className="font-bold">{place.title}</h2>
								<h3 className="text-sm text-gray-500">{place.address}</h3>
								<div className="mt-1">
									<span className="font-bold">
										₹ {place.price.toLocaleString()}
									</span>{" "}
									per night
								</div>
							</Link>
						))}
				</div>
			)}
		</>
	);
};

export default Home;
