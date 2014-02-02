
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , question = require('./routes/question')
  , http = require('http')
  , path = require('path'),
	connect = require('connect'),
	db = require('./models/db'),
	port = 7777;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/question', question.index);
app.get('/question/:id', question.pending);
app.post('/newQuestion', question.post);
app.get('/users', user.list);

//Database Load
db.loadDB(function(err, numItems){
  if(err){throw err;}
  console.log("Database load with "+ numItems + " items.");
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  
});

 global.io = require('socket.io').listen(server);

 io.sockets.on('response', function(data){
  console.log('socket response', data);
 });
