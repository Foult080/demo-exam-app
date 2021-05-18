const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

//use cors policy
app.use(cors());

//use json encode
app.use(express.json({ extended: false }));

app.use("/api/", require("./Routes/Db"));

//resolve static folder for react app
app.use(express.static("front-app/build"));

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, 'front-app', 'build', 'index.html'));
});

//initial port to start
const PORT = process.env.PORT || 5000;

//server app
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
