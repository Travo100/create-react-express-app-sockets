const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3001;
const app = express();

// grabbing our test model
const Test = require("./models/test");

// logging for request to the console
app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/myDatabase",
  {
    useMongoClient: true
  }
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// just a dummy GET route on our Test model
app.get("/data", (req,res) => {
  Test.find((err, data) => { 
    if(err) throw err; 
    res.json(data);
  });
});

// just a post on our Test model
app.post("/new", (req, res) => {
  const test = new Test(req.body);
  test.save(req.body, (err, data) => {
    if(err) throw err;    
    res.json(data);
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  if ( process.env.NODE_ENV === "production" ) {
    res.sendFile(__dirname + "./client/build/index.html");
  } else {
    res.sendFile(__dirname + "./client/public/index.html");
  }
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
