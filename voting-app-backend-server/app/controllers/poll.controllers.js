const Poll = require("../models/poll.model.js");

// Create and Save a new Customer
exports.createQuestion = (req, res) => {
  console.log(req.body,"body question")
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const poll = new Poll({
    question: req.body.question,
    choices: req.body.choices,
    status: req.body.status
  });

  // Save Customer in the database
  Poll.createQuestion(poll, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question."
      });
    else res.send(data);
  });
};


exports.changeStatus = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Poll.changeStatus(
    req.params.id,
    new Poll(req.body.data),
    (err, data) => {
      console.log(req.body, "req.params.id")
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found row with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating question with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.incrementVote = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Poll.incrementVote(
    req.params.id, 
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found row with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating vote-count with id " + req.params.id
          });
        }
      } else {
        res.json(data);

      }
      
    }
    
  );
};

// Retrieve all questions from the database.
exports.getQuestions = (req, res) => {
    Poll.getQuestions((err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions."
      });
    }
      
    else    
     res.end(JSON.stringify(data));
  });
};

// Find choices with a question  id
exports.getChoicesByQuestionId = (req, res) => {
  console.log(req.body,req.params)
  Poll.getChoicesByQuestionId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Choices with question id `
        });
      } else {
        res.status(500).send({
          message: "Error retrieving choice with id " 
        });
      }
    } else if(data.length==0){
      console.log("error get questions")
      res.send({
        success: 0 ,
      });
    }
    else
    
    res.end(JSON.stringify(data));

  });
};




