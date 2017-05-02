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

var user = {name:"Anthony"};
var game = {};

router.get('/anthony/', function(req,res,next){
    res.render('jeux/anthony/accueil',{game :{},user : user,title: 'Signup', msgs:utils.read_messages(req)});
    boule.hello();
});

router.post('/anthony', function(req,res,next){
    var game = {};
    var render = {};

    if (!req.body || !req.body.num){
        res.status(401);
        if (!req.body.couleur) utils.new_message(req,{type:'danger',msg:'Vous  navez pas choisie de couleur !' });
        if (!req.body.num) utils.new_message(req,{type:'danger',msg:'Vous devez choisir un nombre '});
        render = {game : {},user : user,title: 'Signup', msgs:utils.read_messages(req)};
    }else{
        game.num = req.body.num;
        game.color = req.body.select;
        game.numbers = [1,2,3,4,5,6,7,8,9]
        game.random = Math.floor(Math.random() * 9) + 1;
        render = {user: user,game: game,title: 'Signup',msgs: utils.read_messages(req)};
    }

    console.log(req.body);
    res.render('jeux/anthony/accueil',render);

});

var user = {name:"Brudele"};
var Laby = require('../public/jeux/laby/');
var laby = new Laby();

router.get('/brudele/', function(req,res,next){
    res.render('jeux/brudele/accueil',{title: 'Signup', msgs:utils.read_messages(req)});
});

module.exports = router;





