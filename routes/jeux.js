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

var user = {name:"Anthony"};
var game = {};

router.get('/anthony/', function(req,res,next){
    res.render('jeux/anthony/accueil',{game :{},user : user,title: 'Signup', msgs:utils.read_messages(req)});
});

router.post('/anthony', function(req,res,next){
    var game = game;
    var render = {};

    if (!req.body || !req.body.num){
        res.status(401);
        if (!req.body.couleur) utils.new_message(req,{type:'danger',msg:'Vous  navez pas choisie de couleur !' });
        if (!req.body.num) utils.new_message(req,{type:'danger',msg:'Vous devez choisir un nombre '});
        render = {game : {},user : user,title: 'Signup', msgs:utils.read_messages(req)};
    }else{
        console.log(game);
        game.num = req.body.num;
        console.log(req.body);
        //game.color = req.body.select.options[select.selected[index]].value;
        render = {user: user,game: game,title: 'Signup',msgs: utils.read_messages(req)};
    }

    res.render('jeux/anthony/accueil',render);

});

module.exports = router;





