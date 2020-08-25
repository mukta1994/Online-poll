const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

const connection = require("./app/models/db.js");

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
  
require("./app/routes/routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});





