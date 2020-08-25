const connection = require("./db.js");

// constructor
const Poll = function(poll) {
  this.question = poll.question;
  this.status = poll.status;
  this.choices=poll.choices;
};


  Poll.getQuestions = (result) => {
  connection.query('select * from questions_table', (error, results, fields)=> {
    if (error) {
        console.log("error: ", err);
      result(null, error);
      return;
    }
    result(null, results);
  });
};


Poll.changeStatus = (id, poll, result) => {
  console.log("updated customer: ", poll);
  connection.query(
    "UPDATE questions_table SET status= ? WHERE question_id = ?",
    [ poll.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Question with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...poll });
      result(null, { id: id, ...poll });
    }
  );
};

Poll.incrementVote = (id, result) => {
console.log("entered voting")
connection.query('SELECT * FROM choice_table WHERE choice_id = ?', id, function (error, results, fields) {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }
   else {
    if (results.length > 0) {
      let voteCount = results[0].vote_count + 1;
      connection.query('UPDATE choice_table SET vote_count = ? WHERE choice_id = ?', [voteCount, results[0].choice_id], function (error, results, fields) {
        if (error) {
          console.log("error: ", error);
          result(null, error);
          return;
        }
        if (result.affectedRows == 0) {
          // not found Question with the id
          result({ kind: "not_found" }, null);
          return;
        }
        else 
        console.log(results,"123456")
        result(null,results) 
      });
    }
  }
});
}


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
        return;  
      }
    });
};


module.exports = Poll;