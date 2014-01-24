 global.DB = [];
    var fs = require('fs'),
    _ = require('underscore');


var loadDB, persistDB;

loadDB = function() {
  var path;
  path = "" + __dirname + "/db.json";
  return fs.stat(path, function(err, stat) {
    if (err || !stat.isFile()) {
      console.log("[DB Load] DB could not be loaded: DB file missing or invalid.");
      return;
    }
    return fs.readFile(path, function(err, data) {
      var DB;
      if (err) {
        return console.log("[DB Load Error]: " + err);
      } else {
        DB = JSON.parse(data);
        return console.log("[DB Load] starts with " + DB.length + " item(s)");
      }
    });
  });
};

persistDB = function() {
  fs.writeFile("" + __dirname + "/db.json", JSON.stringify(DB));
  return console.log("[DB Save] Persisted BD with " + DB.length + " item(s)");
};
function getQuestion(questionId){
  console.log(questionId, DB);
  return _.findWhere(DB, {id: questionId});
}

function addAnswer(questionId, answer){
	question = _.findWhere(DB, {id: questionId}) || {};
	question.answers = question.answers || [];
	question.answers.push(answer);
	DB[question.id] = question;
	persistDB();
}

function addQuestion(text){
	var length = DB.push({uid: _.uniqueId('question_'), id: DB.length, text: text});
	persistDB();
  return length - 1; //Get the id of the question.
}
function processAnswers(questionId){
	var question = _.findWhere(DB, {id: questionId}) || {};
	return _.countBy(question.answers, function(num){return num;});
}
loadDB();
module.exports = {
	addQuestion: addQuestion,
	addAnswer: addAnswer,
	processAnswers: processAnswers,
  getQuestion: getQuestion
};