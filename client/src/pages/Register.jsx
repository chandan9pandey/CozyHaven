import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

	const handleRegister = async (e) => {
		e.preventDefault();
		const data = {
			name: formData?.name,
			email: formData?.email,
			password: formData?.password,
		};
		const requestOptions = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};
		try {
			const response = await fetch(
				`${baseUrl.concat("register")}`,
				requestOptions
			);
			const res = await response.json();
			// console.log(res);
			if (res.success) {
				localStorage.setItem("auth-token", res.token);
				window.location.replace("/");
			} else {
				alert(res.error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.currentTarget;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Register</h1>
				<form className="max-w-md mx-auto" action="">
					<input
						className="w-full border my-2 py-2 px-3 rounded-full"
						type="text"
						placeholder="Name"
						value={formData?.name}
						onChange={handleInputChange}
						name="name"
					/>
					<input
						className="w-full border my-2 py-2 px-3 rounded-full"
						type="email"
						placeholder="Email"
						value={formData?.email}
						onChange={handleInputChange}
						name="email"
					/>
					<input
						className="w-full border my-2 py-2 px-3 rounded-full"
						type="password"
						placeholder="Password"
						value={formData?.password}
						onChange={handleInputChange}
						name="password"
					/>
					<button
						className="bg-primary p-2 w-full text-white text-lg rounded-2xl my-3"
						onClick={(e) => handleRegister(e)}
					>
						Register
					</button>
					<div className="text-center py-2 text-gray-500 text-base">
						Already a member ?{" "}
						<Link to={"/login"} className="font-bold underline text-black">
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
