/*
 * GET users listing.
 */
var question = require('../models/db').question;

exports.index = function(req, res) {
	var questions = question.all();
	res.render('question', {
		title: 'Question',
		questions: questions
	});
};
exports.pending = function(req, res) {
	var questionId = +req.params.id;
	var question = question.get(questionId);
	res.render('pending-question', question);
};
exports.post = function(req, res) {
	var questionId = question.add(req.body.question);
	res.redirect(/question/ + questionId);
	//db.addAnswer(req.body.questionId, req.body.answer);
	//io.emit('new_score', db.processAnswers());
	//  console.log(req.body);
};