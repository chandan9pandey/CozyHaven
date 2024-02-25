import React, { useState, useEffect } from "react";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from "./AccountNav";
import { useParams } from "react-router-dom";

const PlacesForm = () => {
	const { placeId } = useParams();
	const [title, setTitle] = useState("");
	const [address, setAddress] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState("");
	const [perks, setPerks] = useState([]);
	const [extraInfo, setExtraInfo] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [maxGuests, setMaxGuests] = useState(1);
	const [price, setPrice] = useState("");

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

	useEffect(() => {
		if (!placeId) {
			return;
		}
		axios
			.get(`${baseUrl.concat("places/").concat(placeId)}`)
			.then((response) => {
				const { data } = response;
				setTitle(data.title);
				setAddress(data.address);
				setAddedPhotos(data.photos);
				setDescription(data.description);
				setPerks(data.perks);
				setExtraInfo(data.extraInfo);
				setCheckIn(data.checkIn);
				setCheckOut(data.checkOut);
				setMaxGuests(data.maxGuests);
				setPrice(data.price);
			});
	}, [placeId]);

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

	const savePlace = async (ev) => {
		ev.preventDefault();
		const placeData = {
			title,
			address,
			addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
			price,
		};
		// update place
		if (placeId) {
			try {
				await axios
					.put(
						`${baseUrl.concat("places")}`,
						{ placeId, ...placeData },
						{
							headers: {
								Accept: "application/json",
								"auth-token": `${localStorage.getItem("auth-token")}`,
								"Content-Type": "application/json",
							},
						}
					)
					.then((response) => {
						alert(response);
					})
					.then((window.location = "/account/places"));
			} catch (error) {
				console.log(error);
			}
		}

		// new place
		try {
			if (localStorage.getItem("auth-token")) {
				await axios
					.post(`${baseUrl.concat("places")}`, placeData, {
						headers: {
							Accept: "application/json",
							"auth-token": `${localStorage.getItem("auth-token")}`,
							"Content-Type": "application/json",
						},
					})
					.then((response) => {
						const data = response.data;
						console.log(data);
					})
					.then((window.location = "/account/places"));
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<AccountNav />
			<form onSubmit={savePlace}>
				{preInput(
					"Title",
					"Title for your place. should be short and catchy as in advertisement"
				)}
				<input
					type="text"
					value={title}
					onChange={(ev) => setTitle(ev.target.value)}
					placeholder="title, for example: My lovely apt"
				/>
				{preInput("Address", "Address to this place")}
				<input
					type="text"
					value={address}
					onChange={(ev) => setAddress(ev.target.value)}
					placeholder="address"
				/>
				{preInput("Photos", "more = better")}
				<PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
				{preInput("Description", "description of the place")}
				<textarea
					value={description}
					onChange={(ev) => setDescription(ev.target.value)}
				/>
				{preInput("Perks", "select all the perks of your place")}
				<div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
					<Perks selected={perks} onChange={setPerks} />
				</div>
				{preInput("Extra info", "house rules, etc")}
				<textarea
					value={extraInfo}
					onChange={(ev) => setExtraInfo(ev.target.value)}
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
							type="text"
							value={checkOut}
							onChange={(ev) => setCheckOut(ev.target.value)}
							placeholder="11:00"
						/>
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Max number of guests</h3>
						<input
							type="number"
							value={maxGuests}
							onChange={(ev) => setMaxGuests(ev.target.value)}
						/>
					</div>
					<div>
						<h3 className="mt-2 -mb-1">Price per night</h3>
						<input
							type="number"
							value={price}
							onChange={(ev) => setPrice(ev.target.value)}
						/>
					</div>
				</div>
				<button className="bg-primary my-4 rounded-full px-5 py-2 text-white text-xl w-full ">
					Save
				</button>
			</form>
		</div>
	);
};

export default PlacesForm;
