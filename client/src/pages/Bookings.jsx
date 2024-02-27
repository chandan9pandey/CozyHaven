import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import AccountNav from "../components/AccountNav";
import PlaceImage from "../components/PlaceImage";
import BookingDates from "../components/BookingDates";
import { Grid } from "react-loader-spinner";

const Bookings = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

	useEffect(() => {
		if (localStorage.getItem("auth-token")) {
			axios
				.get(`${baseUrl.concat("bookings")}`, {
					headers: {
						Accept: "application/json",
						"auth-token": `${localStorage.getItem("auth-token")}`,
						"Content-Type": "application/json",
					},
				})
				.then((response) => {
					setBookings(response.data);
					setLoading(false);
				});
		}
	}, []);

	return (
		<div>
			<AccountNav />
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
					{bookings?.length === 0 && (
						<div className="flex justify-center text-xl flex-col items-center">
							No Bookings as of now.
							<br />
							<br />
							<Link to={"/"} className=" underline">
								Book now.
							</Link>
						</div>
					)}
					<div className="flex gap-4 flex-col">
						{bookings?.length > 0 &&
							bookings.map((booking) => (
								<Link
									to={`/account/bookings/${booking._id}`}
									className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
									key={booking._id}
								>
									<div className="w-48">
										<PlaceImage place={booking.place} />
									</div>
									<div className="py-3 pr-3 grow">
										<h2 className="text-xl">{booking.place.title}</h2>
										<div className="text-xl">
											<BookingDates
												booking={booking}
												className="mb-2 mt-4 text-gray-500"
											/>
											<div className="flex gap-1">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-8 h-8"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
													/>
												</svg>
												<span className="text-2xl">
													Total price: ₹ {booking.price.toLocaleString()}
												</span>
											</div>
										</div>
									</div>
								</Link>
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default Bookings;
