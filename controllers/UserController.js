const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res, next) => {

	let query = {};
	query.user_type_id = "2";

	// return array of existing posts
	User.find(query).then((foundUsers) => {
		res.json({
			status: true,
			message: "All users",
			users: foundUsers,
		});
	});
};

exports.createUser = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const hourly_rate = req.body.hourly_rate;

	// create a new user instance
	const user = new User({
		name: name,
		email: email,
		password: password,
		hourly_rate: hourly_rate,
		user_type_id: 2,
		filename: "avatar-icon.jpeg"
	});

	// save the instance to the database
	user
		.save()
		.then((userSaved) => {
			res.status(201).json({
				status: true,
				message: "User Created Successfully!",
				user: userSaved,
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: err.message,
			});
		});
};

exports.loginUser = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	// Find the user by email
	User.findOne({ email: email })
		.then((foundUser) => {
			if (!foundUser) {
				return res.status(401).json({
					status: false,
					message: "Authentication failed. User not found.",
				});
			}

			// Compare the entered password with the hashed password in the database
			bcrypt.compare(password, foundUser.password, (err, result) => {
				if (err || !result) {
					return res.status(401).json({
						status: false,
						message: "Authentication failed. Incorrect password.",
					});
				}

				// Passwords match, authentication successful
				// Create a token
				const token = jwt.sign(
					{
						userId: foundUser._id,
						email: foundUser.email,
					},
					process.env.JWT_SECRET, // Secret key from your environment variables
					{ expiresIn: "24h" } // Token expiration time
				);

				res.status(200).json({
					status: true,
					message: "Authentication successful!",
					user: foundUser,
					token: token, // Include the token in the response
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: err.message,
			});
		});
};

exports.editUser = (req, res, next) => {
	const userId = req.params.userId;
	const updatedData = req.body;

	User.findByIdAndUpdate(userId, updatedData, { new: true })
		.then((updatedUser) => {
			if (!updatedUser) {
				return res.status(404).json({
					status: false,
					message: "User not found.",
				});
			}

			res.status(200).json({
				status: true,
				message: "User updated successfully!",
				user: updatedUser,
			});
		})
		.catch((err) => {
			res.status(500).json({
				status: false,
				message: err.message,
			});
		});
};
