import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";

const Places = () => {
	const { action } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [photoLink, setPhotoLink] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [price, setPrice] = useState("");

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

	const inputHeader = (text) => {
		return <h2 className="text-2xl mt-4">{text}</h2>;
	};
	const inputDescription = (text) => {
		return <p className="text-gray-500 text-sm">{text}</p>;
	};
	const preInput = (header, description) => {
		return (
			<>
				{inputHeader(header)}
				{inputDescription(description)}
			</>
		);
	};
	const addPhotoByLink = async (ev) => {
		ev.preventDefault();
		const { data: filename } = await axios.post(
			`${baseUrl.concat("upload-by-link")}`,
			{
				link: photoLink,
			}
		);
		setAddedPhotos((prev) => {
			return [...prev, filename];
		});
		setPhotoLink("");
	};
	return (
		<div>
			{action !== "new" && (
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
			)}
			{action === "new" && (
				<div>
					<form action="">
						{preInput(
							"Title",
							"Title for your place. should be short and catchy as in advertisement"
						)}
						<input
							className="w-full border my-2 py-2 px-3 rounded-full"
							type="text"
							value={title}
							onChange={(ev) => setTitle(ev.target.value)}
							placeholder="title, for example: My lovely apt"
						/>
						{preInput("Address", "Address to this place")}
						<input
							className="w-full border my-2 py-2 px-3 rounded-full"
							type="text"
							value={address}
							onChange={(ev) => setAddress(ev.target.value)}
							placeholder="address"
						/>
						{preInput("Photos", "more = better")}
						<h2>Photos</h2>
						<div className="flex gap-2">
							<input
								className="w-full border my-2 py-2 px-3 rounded-full"
								type="text"
								value={photoLink}
								onChange={(ev) => setPhotoLink(ev.target.value)}
								placeholder={"Add using a link ...jpg"}
							/>
							<button
								onClick={addPhotoByLink}
								className="bg-gray-200 px-3 rounded-2xl"
							>
								Add Photo
							</button>
						</div>

						<div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ">
							{addedPhotos.length > 0 &&
								addedPhotos.map((link) => <div>{link}</div>)}
							<button className="flex border justify-center gap-1 bg-transparent rounded-2xl p-8 text-2xl  text-gray-600">
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
										d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
									/>
								</svg>
								Upload
							</button>
						</div>
						{preInput("Description", "description of the place")}
						<textarea
							value={description}
							onChange={(ev) => setDescription(ev.target.value)}
							className="w-full border my-2 py-2 px-3 rounded-2xl"
						/>
						{preInput("Perks", "select all the perks of your place")}
						<div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
							<Perks selected={perks} onChange={setPerks} />
						</div>
						{preInput("Extra info", "house rules, etc")}
						<textarea
							value={extraInfo}
							onChange={(ev) => setExtraInfo(ev.target.value)}
							className="w-full border my-2 py-2 px-3 rounded-2xl"
						/>
						{preInput(
							"Check in & out times",
							"add check in and out times, remember to have some time window for cleaning the room between guests"
						)}
						<div className="grid gap-2 grid-cols-2 md:grid-cols-4">
							<div>
								{" "}
								<h3 className="mt-2 -mb-1">Check in time</h3>
								<input
									className="w-full border my-2 py-2 px-3 rounded-2xl"
									type="text"
									value={checkIn}
									onChange={(ev) => setCheckIn(ev.target.value)}
									placeholder="14:00"
								/>
							</div>
							<div>
								{" "}
								<h3 className="mt-2 -mb-1">Check out time</h3>
								<input
									className="w-full border my-2 py-2 px-3 rounded-2xl"
									type="text"
									onChange={(ev) => setCheckOut(ev.target.value)}
									placeholder="11:00"
								/>
							</div>
							<div>
								<h3 className="mt-2 -mb-1">Max number of guests</h3>
								<input
									className="w-full border my-2 py-2 px-3 rounded-2xl"
									type="number"
									value={maxGuests}
									onChange={(ev) => setMaxGuests(ev.target.value)}
								/>
							</div>
							<div>
								<h3 className="mt-2 -mb-1">Price per night</h3>
								<input
									className="w-full border my-2 py-2 px-3 rounded-2xl"
									type="number"
									value={price}
									onChange={(ev) => setPrice(ev.target.value)}
								/>
							</div>
						</div>
						<button className="bg-primary my-4 rounded-full px-5 py-2 text-white text-xl ">
							Save
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Places;
