const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./Config/db");

//use cors policy
app.use(cors());

//use json encode
app.use(express.json({ extended: false }));

//connect to mongoDB Atlas
connectDB();

//api routes
app.use("/api/database/", require("./Routes/Db"));
app.use("/api/users", require("./Routes/Users"));
app.use("/api/auth", require("./Routes/Auth"));
app.use("/api/events", require("./Routes/Events"));


//resolve static folder for react app
app.use(express.static("front-app/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "front-app", "build", "index.html"));
});

//initial port to start
const PORT = process.env.PORT || 5000;

//server app
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
