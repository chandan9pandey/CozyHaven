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
const Booking = require("./models/booking");

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

// to add a place

app.post("/places", fetchUser, async (req, res) => {
	let userId = await User.findOne({ _id: req.user.id });
	const {
		title,
		address,
		addedPhotos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
		price,
	} = req.body;
	try {
		const placeDoc = await Place.create({
			owner: userId,
			title,
			address,
			photos: addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
			price,
		});
		res.json(placeDoc);
	} catch (error) {
		console.log(error);
	}
});

// to fetch user places

app.get("/user-places", fetchUser, async (req, res) => {
	let { id } = await User.findOne({ _id: req.user.id });
	res.json(await Place.find({ owner: id }));
});

// to get specific places

app.get("/places/:id", async (req, res) => {
	const { id } = req.params;
	res.json(await Place.findById(id));
});

// to edit user places

app.put("/places", fetchUser, async (req, res) => {
	let { id } = await User.findOne({ _id: req.user.id });
	const {
		placeId,
		title,
		address,
		addedPhotos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
		price,
	} = req.body;
	try {
		const placeDoc = await Place.findById(placeId);
		if (id === placeDoc.owner.toString()) {
			placeDoc.set({
				title,
				address,
				photos: addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
				price,
			});
			await placeDoc.save();
			res.json("Place Updated Successfully");
		}
	} catch (error) {
		console.log(error);
	}
});

app.get("/places", async (req, res) => {
	res.json(await Place.find());
});

// for bookings

app.post("/bookings", fetchUser, async (req, res) => {
	let userId = await User.findOne({ _id: req.user.id });
	const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
		req.body;
	Booking.create({
		place,
		checkIn,
		checkOut,
		numberOfGuests,
		name,
		phone,
		price,
		user: userId,
	})
		.then((doc) => {
			res.json(doc);
		})
		.catch((err) => {
			throw err;
		});
});

// to fetch user bookings

app.get("/bookings", fetchUser, async (req, res) => {
	let { id } = await User.findOne({ _id: req.user.id });
	res.json(await Booking.find({ user: id }).populate("place"));
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
