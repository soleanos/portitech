
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var util = require('util');
var Utils = require('../utils');
var utils = new Utils();

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('pages/home', { user: req.user, msgs:utils.read_messages(req)});
});

router.get('/', function(req, res, next) {
    if(!req.session.user){
        res.render('pages/index', { user: req.user, msgs:utils.read_messages(req)});
    }else{
        res.redirect('/home');
    }

});












// var GestionResultatJeux = require('../public/javascripts/gestionGainJeux');
// var gestionResultatJeux = new GestionResultatJeux();
//
// router.post('/score', function(req,res,next){
//     gestionResultatJeux.gestionResultat(req)
// });