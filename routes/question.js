
/*
 * GET users listing.
 */
 var db = require('../models/db');

exports.index = function(req, res){
  res.render('question', { title: 'Question' });
};
exports.pending = function(req, res){
  res.render('pending-question', { question: 'Question' });
};
exports.post = function(req, res){
	db.addQuestion(req.body.question);
	//db.addAnswer(req.body.questionId, req.body.answer);
	//io.emit('new_score', db.processAnswers());
  console.log(req.body);
};