/**
 * Created by aarchamb on 20/04/2017.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var util = require('util');
var Utils = require('../utils');
var utils = new Utils();

var Boule = require('../public/javascripts/jeux/anthony/boule');
var boule = new Boule();

var user = {name:"Anthony",money:50};
var game = {};
game.numbers = [1,2,3,4,5,6,7,8,9];
game.colors = ["Rouge","Noir"];


router.get('/', function(req,res,next){

    utils.HasToBeConnected(req,res);
    res.render('jeux/home',{user : req.user, msgs:utils.read_messages(req)});

});


router.get('/anthony/', function(req,res,next){

    utils.HasToBeConnected(req,res);

    if(req.session && req.session.userId){
        User.findById(req.session.userId,function(err,user){
            if (err) return next(err);
            if (!user) req.session.destroy();
            else req.user = user; // on ne sauvegarde pas l'user dans une var de session, mais dans une var temporaire à la requete
        });
    }
    res.render('jeux/anthony/accueil',{game :game,user : req.user,title: 'Signup', msgs:utils.read_messages(req)});

});

router.post('/anthony', function(req,res,next){
    var render = {};

    if (req.body && (req.body.miseNum || req.body.miseColor)){

        game.num = req.body.num;
        game.color = req.body.color;
        game.miseNum = req.body.miseNum;
        game.miseColor = req.body.miseColor;
        game.money = req.session.user.money;
        game = boule.lancerPartie(game);

        User.update({ _id: req.session.user._id }, { $set: { money: game.money }}, function (err, tank) {
            if (err) console.log(err);
        });

        req.session.user.money = game.money;
        render = {user: req.session.user,game: game,title: 'Signup',msgs: utils.read_messages(req)};

    }else{
        res.status(401);
        utils.new_message(req,{type:'danger',msg:'Vous n\'avez rien misé !' });
        render = {game : game,user : req.session.user, msgs:utils.read_messages(req)};
    }

    console.log(req.body);
    res.render('jeux/anthony/accueil',render);

});


var user = {name:"Tetris"};
router.get('/Tetris/', function(req,res,next){
    res.render('jeux/Tetris/accueil',{title: 'Signup', msgs:utils.read_messages(req)});
});


var user = {name:"Brudele"};
//GET method
router.get('/brudele/', function(req,res,next){
    res.render('jeux/brudele/accueil',{title: 'Signup', msgs:utils.read_messages(req)});
});


//GET method
router.get('/brudele/scores', function(req,res,next){
    res.render('jeux/brudele/score', {title: 'Signup', msgs:utils.read_messages(req)});
});


//POST method
router.post('/brudele/score', function(req,res,next){

});

module.exports = router;





