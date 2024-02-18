import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useLocation } from "react-router-dom";

const Account = () => {
	const { user, setUser, ready, email, setLoggedIn } = useContext(UserContext);

	if (!ready) {
		return " Loading...";
	}

	if (ready && !user) {
		return <Navigate to={"/login"} />;
	}

	const { pathname } = useLocation();
	let subpage = pathname.split("/")?.[2];
	if (subpage === undefined) {
		subpage = "profile";
	}

	function linkClasses(type = null) {
		let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
		if (type === subpage) {
			classes += " bg-primary text-white";
		} else {
			classes += " bg-gray-200";
		}
		return classes;
	}

	return (
		<div>
			<nav className="w-full justify-center flex mt-8 gap-2 mb-8">
				<Link className={linkClasses("profile")} to="/account">
					My Profile
				</Link>
				<Link className={linkClasses("bookings")} to="/account/bookings">
					My Bookings
				</Link>
				<Link className={linkClasses("places")} to="/account/places">
					My Accommodations
				</Link>
			</nav>
			{subpage === "profile" && (
				<div className="text-center text-lg">
					Logged in as {user} ({email})<br />
					<button
						onClick={() => {
							localStorage.removeItem("auth-token");
							localStorage.removeItem("name");
							localStorage.removeItem("email");
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
		</div>
	);
};

export default Account;
