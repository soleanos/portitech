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


router.get('/classement', function(req, res, next) {

        var allUsers = [];
        allUsers = User.find({}, function(err, allUsers) {
            var render = { users:{}, user: req.user, msgs:utils.read_messages(req)};
            if(!err){
                render = {users : allUsers, user: req.user, msgs:utils.read_messages(req)};
            }
            res.render('pages/classement', render);
        }).sort({money:-1});


});


module.exports = router;