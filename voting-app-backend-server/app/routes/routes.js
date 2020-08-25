  
module.exports = app => {
    const votes = require("../controllers/poll.controllers.js");
  
    // get all questions
    app.get("/api/getQuestions", votes.getQuestions);
  
    // Retrieve a single question with choices with question id
    app.get("/api/getChoicesByQuestionId/:id", votes.getChoicesByQuestionId);

    //to change status of question
    app.post("/api/changeStatus/:id", 
      votes.changeStatus
    );

    // increment vote count when option is clicked
    app.post("/api/incrementVote/:id", 
      votes.incrementVote
    );
  
  
  };

  