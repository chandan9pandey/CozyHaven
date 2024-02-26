import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { differenceInCalendarDays } from "date-fns";

const BookingWidget = ({ place }) => {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const { user, loggedIn } = useContext(UserContext);

	const [errors, setErrors] = useState({});

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

	useEffect(() => {
		if (user) {
			setName(user);
		}
	}, [user]);

	let numberOfNights = 0;
	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(
			new Date(checkOut),
			new Date(checkIn)
		);
	}

	const bookThisPlace = async () => {
		if (loggedIn) {
			const validationErrors = {};
			const bookingData = {
				checkIn,
				checkOut,
				numberOfGuests,
				name,
				phone,
				place: place._id,
				price: numberOfNights * place.price,
			};
			if (!loggedIn) {
				alert("Please Login to confirm your booking");
			}
			if (!checkIn.trim()) {
				validationErrors.checkIn = "Please enter your Check In Date";
			}
			if (!checkOut.trim()) {
				validationErrors.checkOut = "Please enter your Check Out Date";
			}
			if (!phone.match("[0-9]{10}")) {
				validationErrors.phone = "Please enter a valid Phone Number";
			}

			setErrors(validationErrors);

			if (Object.keys(validationErrors).length === 0) {
				const response = await axios
					.post(`${baseUrl}`.concat("bookings"), bookingData, {
						headers: {
							Accept: "application/json",
							"auth-token": `${localStorage.getItem("auth-token")}`,
							"Content-Type": "application/json",
						},
					})
					.then((response) => {
						const bookingId = response.data._id;
						window.location = `/account/bookings/${bookingId}`;
					});
			}
		} else {
			alert("Please Login to book this place");
		}
	};

	return (
		<div className="bg-white shadow p-4 rounded-2xl">
			<div className="text-2xl text-center">
				Price: ₹ {place.price.toLocaleString()} / per night
			</div>
			<div className="border rounded-2xl mt-4">
				<div className="flex">
					<div className="py-3 px-4">
						<label>Check in:</label>
						<input
							type="date"
							value={checkIn}
							onChange={(ev) => setCheckIn(ev.target.value)}
							min={new Date().toJSON().slice(0, 10)} // check-in date constraint
						/>
					</div>

					<div className="py-3 px-4 border-l">
						<label>Check out:</label>
						<input
							type="date"
							value={checkOut}
							onChange={(ev) => setCheckOut(ev.target.value)}
							min={checkIn}
							max="2025-12-31" // check-out date constraint
						/>
					</div>
				</div>
				{errors.checkIn && (
					<span className="text-red-500 text-lg  px-4">{errors.checkIn}</span>
				)}
				<br />
				{errors.checkOut && (
					<span className="text-red-500 text-lg  px-4">{errors.checkOut}</span>
				)}
				<div className="py-3 px-4 border-t">
					<label>Number of guests:</label>
					<input
						type="number"
						value={numberOfGuests}
						onChange={(ev) => setNumberOfGuests(ev.target.value)}
					/>
				</div>
				{numberOfNights > 0 && (
					<div className="py-3 px-4 border-t">
						<label>Your full name:</label>
						<input
							type="text"
							value={name}
							placeholder=""
							onChange={(ev) => setName(ev.target.value)}
						/>
						<label>Phone number:</label>
						<input
							type="tel"
							value={phone}
							onChange={(ev) => setPhone(ev.target.value)}
						/>
						{errors.phone && (
							<span className="text-red-500 text-lg">{errors.phone}</span>
						)}
					</div>
				)}
			</div>
			<button
				onClick={bookThisPlace}
				className="bg-primary my-4 rounded-full px-5 py-2 text-white text-xl w-full"
			>
				Book this place
				{numberOfNights > 0 && (
					<span> ₹ {(numberOfNights * place.price).toLocaleString()}</span>
				)}
			</button>
		</div>
	);
};

export default BookingWidget;
