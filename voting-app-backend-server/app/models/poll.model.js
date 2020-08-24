const connection = require("./db.js");

// constructor
const Poll = function(question) {
  this.question = question.question;
  this.status = question.status;
  this.choices=question.choices;
};


  Poll.getQuestions = (result) => {
    console.log("poll get questions")
  connection.query('select * from questions_table', (error, results, fields)=> {
    if (error) {
        console.log("error: ", err);
      result(null, error);
      return;
    }
    result(null, results);
    //res.end(JSON.stringify(results));
  });
  //res.json(results);
};

Poll.getChoicesByQuestionId = (req, res) => { 
    //.escape is used to prevent SQL injections, which is a common web hacking technique to destroy or misuse your database.
    console.log("poll get questions")
    var sql = 'SELECT * FROM choice_table WHERE question_id = ' + connection.escape(req);
    connection.query(sql, (err, result)=> {
      if (err) {result(err, null);
        return;
    }
    if(result.length){
        console.log("found customer: ", result[0]);
        res(null, result);
        //res.end(JSON.stringify(result));
        return;  
      }
    });
    // res.json(results);
};



module.exports = Poll;