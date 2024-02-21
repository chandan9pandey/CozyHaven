const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

dotenv.config();
app.use(express.json());
app.use(cors());

const User = require("./models/user");
const Place = require("./models/place");

app.use("/uploads", express.static("uploads/"));

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
					res.status(422).json({
						success: false,
						message: "User could not be created, try again later",
						error: error.message,
					})
				);
		});
	}
});

// to Login user

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			error: "Please fill in all the required fields",
		});
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({
				success: false,
				message: "Login failed",
				error: "User not found",
			});
		} else {
			bcrypt.compare(password, user.password).then(function (result) {
				if (result) {
					const maxAge = 3 * 60 * 60;
					const token = jwt.sign(
						{
							id: user._id,
							email,
						},
						process.env.JWT_SECRET_KEY,
						{
							expiresIn: maxAge, // 3hrs in seconds
						}
					);
					res.cookie("jwt", token, {
						httpOnly: true,
						maxAge: maxAge * 1000, // 3hrs in ms
					});
					res.status(201).json({
						success: true,
						message: "User successfully Logged in",
						user: user._id,
						name: user.name,
						token,
					});
				} else {
					res.status(400).json({
						success: false,
						error: "The username or password you entered is incorrect.",
					});
				}
			});
		}
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "An error occurred",
			error,
		});
	}
});

// creating middleware to fetch user

const fetchUser = async (req, res, next) => {
	try {
		const token = req.header("auth-token");
		if (!token) return res.status(403).send({ error: "Access Denied" });
		const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = data;
		next();
	} catch (error) {
		res.status(400).send({ error: "Invalid Token" });
	}
};

// to fetch profile

app.post("/profile", fetchUser, async (req, res) => {
	let { name, email, _id } = await User.findOne({ _id: req.user.id });
	res.json({ name, email, _id });
});

// upload photo by link

app.post("/upload-by-link", async (req, res) => {
	const { link } = req.body;
	try {
		const newName = "photo" + Date.now() + ".jpg";
		await imageDownloader.image({
			url: link,
			dest: __dirname + "/uploads/" + newName,
		});
		res.json(newName);
	} catch (error) {
		console.log(error);
	}
});

// photos middleware

const photosMiddleware = multer({ dest: "uploads/" });

// to upload photo from device

app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
	const uploadedFiles = [];
	for (let i = 0; i < req.files.length; i++) {
		const { path, originalname } = req.files[i];
		const parts = originalname.split(".");
		const ext = parts[parts.length - 1];
		const newPath = path + "." + ext;
		fs.renameSync(path, newPath);
		uploadedFiles.push(newPath.replace("uploads", ""));
	}
	res.json(uploadedFiles);
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
