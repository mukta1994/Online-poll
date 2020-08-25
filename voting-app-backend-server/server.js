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


  app.post('/api/createQuestion', (req, res) => {
    console.log(req.body)
    const question = { question: req.body.question, status:'req.body.status' };
    const choices = req.body.choices
    // const status=req.body.status
    var choicelist = [];
  
    console.log('Adding user:::::', req.body.choices);
    connection.query('INSERT INTO questions_table SET ?', question, function (error, results) {
      if (error) throw error;
      else {
        choices.forEach(element => {
          choicelist.push([results.insertId, element.name, 0])
        });
  
        var stmt = "INSERT INTO choice_table (question_id, choice, vote_count)  VALUES ?";
  
        // execute the insert statment
        connection.query(stmt, [choicelist], function (err, results, fields) {
          if (err) {
            return console.error(err.message);
          }
          // get inserted rows
          console.log('Row inserted:' + results.affectedRows);
        });
      }
      console.log(choicelist)
      res.end(JSON.stringify(results));
    });
    res.json("user add");
  });
  
require("./app/routes/routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});





