import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const baseUrl = import.meta.env.VITE_BASE_URL; // Server Url

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

	const handleRegister = async (e) => {
		e.preventDefault();
		const data = {
			name: formData?.name,
			email: formData?.email,
			password: formData?.password,
		};

		const validationErrors = {};
		if (!formData?.name.trim()) {
			validationErrors.name = "Please enter your name";
			toast.error(validationErrors.name, toastProperties);
		}
		if (!formData?.email.trim()) {
			validationErrors.email = "Please enter your email address";
			toast.error(validationErrors.email, toastProperties);
		} else if (!/^\S+@\S+\.\S+$/.test(formData?.email)) {
			validationErrors.email = "Email address is invalid";
			toast.error(validationErrors.email, toastProperties);
		}
		if (!formData?.password.trim()) {
			validationErrors.password = "Please enter your password";
			toast.error(validationErrors.password, toastProperties);
		} else if (formData?.password.length < 6) {
			validationErrors.password =
				"Password should be at least 6 characters long";
			toast.error(validationErrors.password, toastProperties);
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
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
					toast.success(
						"Congrats! Your account has been successfully registered.",
						toastProperties
					);
					setTimeout(() => {
						window.location.replace("/");
					}, 3000);
				} else {
					let message = res.error;
					toast.error(message, toastProperties);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.currentTarget;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4 font-bold">Register</h1>
				<form className="max-w-md mx-auto" action="">
					<input
						type="text"
						placeholder="Name"
						value={formData?.name}
						onChange={handleInputChange}
						name="name"
					/>
					{/* {errors.name && (
						<span className="text-red-500 text-lg">{errors.name}</span>
					)} */}
					<input
						type="email"
						placeholder="Email"
						value={formData?.email}
						onChange={handleInputChange}
						name="email"
					/>
					{/* {errors.email && (
						<span className="text-red-500 text-lg">{errors.email}</span>
					)} */}
					<input
						type="password"
						placeholder="Password"
						value={formData?.password}
						onChange={handleInputChange}
						name="password"
					/>
					{/* {errors.password && (
						<span className="text-red-500 text-lg">{errors.password}</span>
					)} */}
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
