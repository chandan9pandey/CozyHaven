import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="mt-4 grow flex items-center justify-around">
			<div className="mb-64">
				<h1 className="text-4xl text-center mb-4">Login</h1>
				<form className="max-w-md mx-auto" action="">
					<input
						className="w-full border my-2 py-2 px-3 rounded-full"
						type="email"
						placeholder="Email"
					/>
					<input
						className="w-full border my-2 py-2 px-3 rounded-full"
						type="password"
						placeholder="Password"
					/>
					<button className="bg-primary p-2 w-full text-white text-lg rounded-2xl my-3">
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
