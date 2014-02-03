/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  question = require('./routes/question'),
  http = require('http'),
  path = require('path'),
  connect = require('connect'),
  flash = require('connect-flash'),
  db = require('./models/db'),
  port = 7777;

var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// all environments

app.use(express.favicon());
app.use(express.logger('development' === app.get('env') ? 'dev' : 'default'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('Kwizz'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(function(req, res, next) {
  app.locals.flash = req.flash(); // Variable partagé pour les vues.
  app.locals.url = req.url;
  app.locals.query = req.query;
  next();
});

//Nom de l'application
app.locals.title = "Kwiz";

//App configure utilise le mode de dev de node env par défaut
app.configure('development', function() {
  app.use(express.errorHandler());
  app.locals.pretty = true; //Unmimefied the html genreated with jade.
});

//Database Load
db.loadDB(function(err, numItems) {
  if (err) {
    throw err;
  }
  console.log("Database load with " + numItems + " items.");
});

//Socket registering.
var io = require('./engine/web-sockets')(server);



app.get('/', routes.index);
app.get('/question', question.index);
app.get('/question/:id', question.pending);
app.post('/newQuestion', question.post);
app.get('/users', user.list);
app.get('/socketTest', function(req, res) {
  require('./engine/web-sockets').sockets.emit('test', {
    test: "papa singe"
  });
  res.end('PAPA SINGE');
});


require('./engine/web-sockets').sockets.on('papa', function(data){
  console.log('RESPONSE TO EMIM', data);
});


server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));

});

//Register sockets.