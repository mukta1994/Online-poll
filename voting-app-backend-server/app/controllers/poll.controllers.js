const Poll = require("../models/poll.model.js");


// Retrieve all questions from the database.
exports.getQuestions = (req, res) => {
  console.log("5000")
    Poll.getQuestions((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else     res.end(JSON.stringify(data));
    //  res.send(data);
  });
};

// Find choices with a question  id
exports.getChoicesByQuestionId = (req, res) => {
  console.log(req.body,req.params)
  Poll.getChoicesByQuestionId(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Choices with question id ${req.params.question_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.customerId
        });
      }
    } else res.end(JSON.stringify(data));
  });
};




