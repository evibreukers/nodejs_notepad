// set up express
const express = require("express");
const app = express();

// import the router
const router = require("./routes/routes");

// set up ejs view engine
app.set("view engine", "ejs");

//set up mongoose
const mongoose = require("mongoose");

// connect to mongoDB
const dbURI =
  "mongodb+srv://evimaria:evimaria@cluster0.bu3po.mongodb.net/notes?retryWrites=true&w=majority";
mongoose
  // connect mongoose to mongoDB
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("database connected");
    // only listen for requests when database is loaded
    app.listen(4000);
  })
  .catch((err) => console.log(err));

// static files (public folder will be made public to the browser)
app.use(express.static("public"));
// convert characters (form) into object which can be transferred over the internet
app.use(express.urlencoded({ extended: true }));

// middleware which will fire for every request
app.use((req, res, next) => {
  console.log("new request made");
  console.log(
    `host: ${req.hostname}, path: ${req.path}, method: ${req.method}`
  );
  // explicitly tell that we are finished inside the middleware
  next();
});

// Connect to router
app.use(router);

// 404 PAGE
router.use((req, res) => {
  res.status(404).render("404");
});
