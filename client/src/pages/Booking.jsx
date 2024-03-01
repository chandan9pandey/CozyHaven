import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";

const Booking = () => {
	const { id } = useParams();
	const [booking, setBooking] = useState(null);

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

	useEffect(() => {
		if (id) {
			axios
				.get(`${baseUrl.concat("bookings")}`, {
					headers: {
						Accept: "application/json",
						"auth-token": `${localStorage.getItem("auth-token")}`,
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					const foundBooking = response.data.find(({ _id }) => _id === id);
					if (foundBooking) {
						setBooking(foundBooking);
					}
				});
		}
	}, [id]);

	if (!booking) {
		return "";
	}

	return (
		<div className="my-8">
			<div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-semibold mb-4">
						Reservation Confirmed !
					</h1>
					<h2 className="text-2xl mb-4">Your booking information:</h2>
					<BookingDates booking={booking} />
				</div>
				<div className="bg-primary p-6 text-white rounded-2xl">
					<div>Total price</div>
					<div className="text-3xl">₹ {booking.price.toLocaleString()}</div>
				</div>
			</div>
			<div className="bg-gray-200 p-6 my-6 rounded-2xl flex-col items-center justify-between">
				<h1 className="text-3xl">{booking.place.title}</h1>
				<AddressLink className="my-4 block ">
					{booking.place.address}
				</AddressLink>
				<PlaceGallery place={booking.place} />
			</div>
		</div>
	);
};

export default Booking;
