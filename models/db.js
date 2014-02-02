 var DB = [];
 var fs = require('fs'),
   _ = require('underscore');


 var loadDB, persistDB;

 loadDB = function(cb) {
   var path;
   path = "" + __dirname + "/db.json";
   return fs.stat(path, function(err, stat) {
     if (err || !stat.isFile()) {
      var errMessage = "[DB Load] DB could not be loaded: DB file missing or invalid.";
       //console.log(errMessage);
       return cb(errMessage, null);
     }
     return fs.readFile(path, function(err, data) {
       if (err) {
        var errMessage = "[DB Load Error]: " + err;
         return cb("[DB Load Error]: " + err, null);
       } else {
         DB = JSON.parse(data);
         console.log("[DB Load] starts with " + DB.length + " item(s)");
        return cb(null, DB.length);
       }
     });
   });
 };

 persistDB = function() {
   fs.writeFile("" + __dirname + "/db.json", JSON.stringify(DB));
   return console.log("[DB Save] Persisted BD with " + DB.length + " item(s)");
 };

 function getQuestion(questionId) {
   //console.log(questionId, DB);
   return _.findWhere(DB, {
     id: questionId
   });
 }

 function addAnswer(questionId, answer) {
   answer.createdOn = Date.now();
   question = _.findWhere(DB, {
     id: questionId
   }) || {};
   question.answers = question.answers || [];
   question.answers.push(answer);
   DB[question.id] = question;
   persistDB();
 }

 function addQuestion(text) {
   var length = DB.push({
     uid: _.uniqueId('question_'),
     id: DB.length,
     text: text,
     createdOn: Date.now(),
     answers: []
   });
   persistDB();
   return length - 1; //Get the id of the question.
 }

 function processAnswers(questionId) {
   var question = _.findWhere(DB, {
     id: questionId
   }) || {};
   return _.countBy(question.answers, function(answer) {
      return answer == 1 ? 'Oui': 'Non';
   });
 }


 function allQuestions(options) {
   options = options || {};
   if (options.all) {
     return DB;
   }
   var length = options.length = options.length || 10;
   console.log(length);
   return DB.slice(DB.length - length, length);
 }
 module.exports = {
   loadDB: loadDB,
   question: {
     add: addQuestion,
     all: allQuestions,
     get: getQuestion
   },
   answer: {
     add: addAnswer,
     process: processAnswers
   }
 };