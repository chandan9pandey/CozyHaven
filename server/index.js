const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors());

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
