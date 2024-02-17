import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = (props) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

	useEffect(() => {
		if (localStorage.getItem("auth-token")) {
			setLoggedIn(true);
			fetch(`${baseUrl.concat("profile")}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: "",
			})
				.then((response) => response.json())
				.then((data) => {
					localStorage.setItem("name", data.name), setUser(data.name);
					localStorage.setItem("email", data.email);
				});
		}
	}, []);

	const contextValue = {
		loggedIn,
		user,
		setUser,
	};

	return (
		<UserContext.Provider value={contextValue}>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
