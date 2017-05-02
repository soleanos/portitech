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
router.get('/anthony/', function(req,res,next){
    res.render('jeux/anthony/accueil',{title: 'Signup', msgs:utils.read_messages(req)});
});

var user = {name:"Brudele"};
router.get('/brudele/', function(req,res,next){
    res.render('jeux/brudele/accueil',{title: 'Signup', msgs:utils.read_messages(req)});
});

module.exports = router;





