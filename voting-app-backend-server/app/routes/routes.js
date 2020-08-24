  
module.exports = app => {
    const votes = require("../controllers/poll.controllers.js");
  
    // get all questions
    app.get("/api/getQuestions", votes.getQuestions);
  
    // Retrieve a single question with choices with question id
    app.get("/api/getChoicesByQuestionId/:id", votes.getChoicesByQuestionId);
  
  
  };

  