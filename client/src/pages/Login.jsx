import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const { setUser } = useContext(UserContext);

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

	const handleLogin = async (e) => {
		e.preventDefault();
		const data = {
			email: formData?.email,
			password: formData?.password,
		};

		const validationErrors = {};
		if (!formData?.email.trim()) {
			toast.error("Please enter your email address", toastProperties);
			validationErrors.email = "Please enter your email address";
		} else if (!/^\S+@\S+\.\S+$/.test(formData?.email)) {
			toast.error("Email address is invalid", toastProperties);
			validationErrors.email = "Email address is invalid";
		}
		if (!formData?.password.trim()) {
			toast.error("Please enter your password", toastProperties);
			validationErrors.password = "Please enter your password";
		} else if (formData?.password.length < 6) {
			toast.error(
				"Password should be at least 6 characters long",
				toastProperties
			);
			validationErrors.password =
				"Password should be at least 6 characters long";
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
					`${baseUrl.concat("login")}`,
					requestOptions
				);
				const res = await response.json();
				// console.log(res);
				if (res.success) {
					localStorage.setItem("auth-token", res.token);
					setUser(res.name);
					window.location.replace("/");
				} else {
					alert(res.message);
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
				<h1 className="text-4xl text-center mb-4 font-bold">Login</h1>
				<form className="max-w-md mx-auto" action="">
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
						onClick={(e) => handleLogin(e)}
					>
						Login
					</button>
					<div className="text-center py-2 text-gray-500 text-base">
						Don't have an account yet ?{" "}
						<Link to={"/register"} className="font-bold underline text-black">
							Register now
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
