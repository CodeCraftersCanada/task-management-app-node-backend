require('dotenv').config();

//import express
const express = require('express');
// import mangoose
const mongoose = require('mongoose');
// import the feed routes
const appRoutes = require('./routes/routes');
// create the express app
const app = express();
// to parse incoming json
app.use(express.json());


app.use('/api', appRoutes);

// setup a database connection using mongoose
// past the connection string given from your atlas server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => {
    // listen to incoming requests on port 8080
    app.listen(process.env.API_PORT);
  })
  .catch(err => console.log('err', err))