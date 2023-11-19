const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const Status = require('../models/TaskStatusModel');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const defaultUsers = [
    { name: 'Admin 1', email: 'admin1@taskmgt.com', password: 'password', hourly_rate: '10' },
    { name: 'Admin 2', email: 'admin2@taskmgt.com', password: 'password', hourly_rate: '15' }
];

const hashPasswords = async () => {
    const saltRounds = 10;
    return Promise.all(defaultUsers.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return { ...user, password: hashedPassword };
    }));
};

hashPasswords()
    .then((usersWithHashedPasswords) => User.insertMany(usersWithHashedPasswords))
    .then(() => {
        console.log('Default data with hashed passwords inserted successfully.');
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error inserting default data with hashed passwords:', error);
        mongoose.connection.close();
    });

//adding task status
const defaultStatus = [
    { name: 'New' },
    { name: 'In Progress' },
    { name: 'Complete' }
];

Status.insertMany(defaultStatus)
  .then(() => {
    console.log('Default task status data inserted successfully.');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting default task status data:', error);
    mongoose.connection.close();
  });

