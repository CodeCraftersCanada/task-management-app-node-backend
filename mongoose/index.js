const mongoose = require("mongoose");

//connect to mongoDB

mongoose.connect("mongodb+srv://root:UaXHBo2UwnFRzkQv@cluster-task-app.yfz7h5o.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to MongoDB");

})
.catch((err) => {
    console.log("error: ", err)
});