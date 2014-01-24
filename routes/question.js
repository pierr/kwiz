
/*
 * GET users listing.
 */
 var db = require('../models/db');

exports.index = function(req, res){
  res.render('question', { title: 'Question' });
};
exports.pending = function(req, res){
	var questionId = req.params.questionId;
	var question = db.getQuestion(questionId);
	console.log(question, questionId);
  res.render('pending-question', { question: question});
};
exports.post = function(req, res){
	var questionId = db.addQuestion(req.body.question);
	res.redirect(/question/+questionId);
	//db.addAnswer(req.body.questionId, req.body.answer);
	//io.emit('new_score', db.processAnswers());
	//  console.log(req.body);
};