import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import Places from "./Places";
import AccountNav from "../components/AccountNav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
	const { user, setUser, ready, email, setEmail, setLoggedIn } =
		useContext(UserContext);

	let { subpage } = useParams();

	const toastProperties = {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	};

	if (!ready) {
		return " Loading...";
	}

	if (ready && user === "") {
		return <Navigate to={"/login"} />;
	}

	return (
		<div className="">
			<AccountNav />
			{subpage === undefined && (
				<div className=" flex flex-col gap-10 justify-center align-items text-center text-lg min-h-screen">
					Logged in as {user} ({email})
					<br />
					<button
						onClick={() => {
							localStorage.clear();
							setLoggedIn(false);
							toast.info("Logging Out");
							setTimeout(() => {
								window.location.replace("/");
							}, 3000);
							setTimeout(() => {
								setUser(null);
								setEmail(null);
							}, 5000);
						}}
						className="bg-primary text-white rounded-full max-w-lg mx-auto mt-2 px-5"
					>
						Logout
					</button>
				</div>
			)}
			{subpage === "places" && <Places />}
		</div>
	);
};

export default Profile;
