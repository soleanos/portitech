var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connexion DB
mongoose.connect('mongodb://localhost/portitech');

//appeler le modele
require('./models/users_model');
var User = mongoose.model('User');
require('./models/jeux_model');
var Jeux = mongoose.model('game');

//CREATIONS DES JEUX EN BASE

//On vide la collection

Jeux.remove({}, function(err) {
    if(err){
        console.log(err)
    }
});

//Instantiation des jeux

var boule = new Jeux({ name: 'boule',createur:'Anthony',lien:'/jeux/boule'});
var tetris = new Jeux({ name: 'tetris',createur:'Clement',lien:'/jeux/tetris'});
var labyrinth = new Jeux({ name: 'Labyrinth',createur:'Brudele et Servino',lien:'/jeux/laby'});
var MamouthSport = new Jeux({ name: 'Mamouth-Sport',createur:'Mahmut',lien:'/jeux/mahmutSport'});
var breakOut = new Jeux({ name: 'BreakOut',createur:'Farid',lien:'/jeux/BreakOut'});
var puzzle = new Jeux({ name: 'Cat puzzle',createur:'Anthony',lien:'/jeux/puzzle'});
var invader = new Jeux({ name: 'Cat invaders',createur:'Anthony',lien:'/jeux/invader'});

//Insertion en base

labyrinth.save();
tetris.save();
boule.save();
MamouthSport.save();
breakOut.save();
puzzle.save();
invader.save();

var routes = require('./routes/index');
var users = require('./routes/users');
var jeux = require('./routes/jeux');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:'46546546abcdef',saveUninitialized:false,resave:false}));
app.use(express.static(path.join(__dirname, 'public')));

// faire appel à un middleware pour avoir l'user sous la main tout le temps
app.use(function(req,res,next){
	if(req.session && req.session.userId){
		User.findById(req.session.userId,function(err,user){
			if (err) return next(err);
			if (!user) req.session.destroy();
			else req.user = user; // on ne sauvegarde pas l'user dans une var de session, mais dans une var temporaire à la requete
			next();
		});
	} else next();
	
});
app.use('/', routes);
app.use('/users', users);
app.use('/jeux', jeux);

// normalement, la suite, pas besoin d'y toucher.
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;