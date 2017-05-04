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
var gestionGainJeux = require('../public/javascripts/gestionGainJeux');

router.post('/score', function(req,res,next){

    utils.HasToBeConnected(req,res);
    res.render('jeux/home',{user : req.user, msgs:utils.read_messages(req)});

});