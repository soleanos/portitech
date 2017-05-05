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
var GestionResultatJeux = require('../public/javascripts/gestionGainJeux');
var gestionResultatJeux = new GestionResultatJeux();

router.post('/score', function(req,res,next){
    gestionResultatJeux.gestionResultat(req)
});


