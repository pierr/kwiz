//On pourrait le placer dans un engine plutôt que controller.
var io = require('socket.io');
var answerDB = require('../models/db').answer;

var singleton = module.exports = function(server) {
	if (singleton.sockets) {
		return;
	}
	var ws = io.listen(server); //Pour le filer aux controllers.
	ws.sockets.on('connection', function(socket) {
		console.log('Register all events the socket has to to listen to.');
		/*Register all events treated by the socket.*/
		//Todo: Move it into a special section.
		socket.on("papa", function(name) {
			console.log('SOCKET PPA ON.' + name);
		});

		socket.on('answer', function(answer, fn){
			console.log('answer', answer);
			answerDB.add(answer.questionId, answer);
			ws.sockets.emit('answer:new', {questionId: answer.questionId, value: answer.value});
			fn('Ok /' + answer.questionId);
			
			//socket.emit('flash', {type: "success", message: "Votre réponse a bien été prise en compte. Merci."});
		});
	});
	singleton.sockets = ws.sockets;
};