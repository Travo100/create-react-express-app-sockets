const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3001;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// grabbing our test model
const Test = require("./models/test");

// logging for request to the console
app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/myDatabase", { useNewUrlParser: true });

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// this is our connection to socket
io.on('connection', (client) => {

  // we are listening to an event here called 'message'
  client.on('message', (message) => {
    // and emitting the message event for any client listening to it
    io.emit('message', message);
  });
});

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
    res.sendFile(__dirname + "/client/public/index.html");
  }
});

server.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});