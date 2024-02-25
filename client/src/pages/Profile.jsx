import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import Places from "./Places";
import AccountNav from "../components/AccountNav";

const Profile = () => {
	const { user, setUser, ready, email, setLoggedIn } = useContext(UserContext);

	let { subpage } = useParams();

	if (!ready) {
		return " Loading...";
	}

	if (ready && user === "") {
		return <Navigate to={"/login"} />;
	}

	return (
		<div>
			<AccountNav />
			{subpage === undefined && (
				<div className="text-center text-lg">
					Logged in as {user} ({email})<br />
					<button
						onClick={() => {
							localStorage.clear();
							setLoggedIn(false);
							setUser(null);
							window.location.replace("/");
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
