import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingWidget from "../components/BookingWidget";
import { Grid } from "react-loader-spinner";

const Place = () => {
	const { id } = useParams();
	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url
	const [place, setPlace] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		if (!id) {
			return;
		}
		axios
			.get(`${baseUrl.concat("places/").concat(id)}`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then(({ data }) => {
				setPlace(data);
				setLoading(false);
			});
	}, [id]);
	// if (!place) return "";

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
				<>
					<div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
						<h1 className="text-3xl">{place.title}</h1>
						<AddressLink>{place.address}</AddressLink>
						<PlaceGallery place={place} />
						<div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
							<div>
								<div className="my-4">
									<h2 className="font-semibold text-2xl">Description</h2>
									{place.description}
								</div>
								Check-in: {place.checkIn}
								<br />
								Check-out: {place.checkOut}
								<br />
								Max number of guests: {place.maxGuests}
								<div className="my-4">
									<h2 className="font-semibold text-2xl">Perks</h2>
									{place.description}
								</div>
							</div>
							<div>
								<BookingWidget place={place} />
							</div>
						</div>
						<div className="bg-white -mx-8 px-8 py-8 border-t">
							<div>
								<h2 className="font-semibold text-2xl">Extra info</h2>
							</div>
							<div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
								{place.extraInfo}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Place;
