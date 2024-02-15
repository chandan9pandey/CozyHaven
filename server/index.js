const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

dotenv.config();
app.use(express.json());
app.use(cors());

const User = require("./models/user");

// to register user

app.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	if (await User.findOne({ email: email })) {
		return res.status(400).json({
			success: false,
			error: "User already registered. Please continue to Login",
		});
	} else if (!name || !email || !password) {
		res.json({ error: "Empty body received." });
	} else {
		bcrypt.hash(password, 10).then(async (hash) => {
			await User.create({
				name: name,
				email: email,
				password: hash,
			})
				.then((user) => {
					const maxAge = 3 * 60 * 60;
					const token = jwt.sign(
						{
							id: user._id,
							email,
						},
						process.env.JWT_SECRET_KEY,
						{
							expiresIn: maxAge, //3hrs in seconds
						}
					);
					res.cookie("jwt", token, {
						httpOnly: true,
						maxAge: maxAge * 1000, // 3hrs in ms
					});
					res.status(201).json({
						success: true,
						message: "User successfully created",
						user: user._id,
						token,
					});
				})
				.catch((error) =>
					res.status(400).json({
						success: false,
						message: "User could not be created, try again later",
						error: error.message,
					})
				);
		});
	}
});

app.get("/", (req, res) => {
	res.send("Everything is fine!");
});

app.listen(process.env.PORT, (error) => {
	try {
		mongoose.connect(process.env.DB_URL);
		console.log("DB connection established");
	} catch (error) {
		console.log("DB connection error", error);
	}
});
