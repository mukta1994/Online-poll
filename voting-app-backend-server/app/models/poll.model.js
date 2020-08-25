const connection = require("./db.js");

// constructor
const Poll = function(poll) {
  this.question = poll.question;
  this.status = poll.status;
  this.choices=poll.choices;
};

Poll.createQuestion=(newQuestion,results)=>{
  // const status=req.body.status
  const newQue={question:newQuestion.question,status:newQuestion.status}
  var choicelist = [];

  // console.log('Adding question:::::', newQuestion.choices);
  connection.query('INSERT INTO questions_table SET ?', newQue, function (error, result) {
    if (error) {
      console.log("error: ", error);
      results(error, null);
      return;
    }
    else {
      newQuestion.choices.forEach(element => {
        choicelist.push([result.insertId, element.name, 0])
      });

      var stmt = "INSERT INTO choice_table (question_id, choice, vote_count)  VALUES ?";

      // execute the insert statment
      connection.query(stmt, [choicelist], function (err, res) {
        if (err) {
          return console.error(err.message);
        }
  
    results(null,{data:res,success:'ok'});
        console.log('Row inserted:' + res.affectedRows);
      });
    }

  });
}

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
      result(null, {result:result,success:'ok' });
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
        result(null,{result:results,success:'ok'}) 
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
        console.log("found choices: ", result[0]);
        res(null, {result:result,success:'ok'});
        return; 
         
      }
      else{
        res(null, result);
      }
    });
};


module.exports = Poll;