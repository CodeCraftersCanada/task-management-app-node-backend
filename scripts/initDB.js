const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const Status = require("../models/TaskStatusModel");
const UserType = require("../models/UserTypeModel");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on(
	"error",
	console.error.bind(console, "MongoDB connection error:")
);

const defaultUsers = [
	{
		name: "Admin 1",
		email: "admin1@taskmgt.com",
		password: "a",
		hourly_rate: "10",
		user_type_id: 1,
		filename: "admin1.jpg",
	},
	{
		name: "Admin 2",
		email: "admin2@taskmgt.com",
		password: "a",
		hourly_rate: "15",
		user_type_id: 1,
		filename: "dummy.png",
	},
];

const hashPasswords = async () => {
	const saltRounds = 10;
	return Promise.all(
		defaultUsers.map(async (user) => {
			const hashedPassword = await bcrypt.hash(user.password, saltRounds);
			return { ...user, password: hashedPassword };
		})
	);
};

hashPasswords()
	.then((usersWithHashedPasswords) => User.insertMany(usersWithHashedPasswords))
	.then(() => {
		console.log("Default data with hashed passwords inserted successfully.");
		mongoose.connection.close();
	})
	.catch((error) => {
		console.error("Error inserting default data with hashed passwords:", error);
		mongoose.connection.close();
	});

//adding task status
const defaultStatus = [
	{ _id: 1, name: "New" },
	{ _id: 2, name: "In Progress" },
	{ _id: 3, name: "Complete" },
];

Status.insertMany(defaultStatus)
	.then(() => {
		console.log("Default task status data inserted successfully.");
		mongoose.connection.close();
	})
	.catch((error) => {
		console.error("Error inserting default task status data:", error);
		mongoose.connection.close();
	});

//adding user type
const defaultUserType = [
	{ name: "Admin", user_type_id: 1 },
	{ name: "Member", user_type_id: 2 },
];

UserType.insertMany(defaultUserType)
	.then(() => {
		console.log("Default user type data inserted successfully.");
		mongoose.connection.close();
	})
	.catch((error) => {
		console.error("Error inserting default user type data:", error);
		mongoose.connection.close();
	});
