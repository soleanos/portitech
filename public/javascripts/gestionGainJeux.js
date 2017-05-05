var mongoose = require('mongoose');
var User = mongoose.model('User');

function gestionGainJeux(){}

enregistrerGain = function(gain,user) {
    User.update({ _id: user._id }, { $set: { money: gain }}, function (err, user) {
        if (err) console.log(err);
    });
};

//Score dois être un objet de la forme : {jeux:"Boule",score:200}
enregistrerScore = function(score,user) {
    var scores = user.scores.push(score);

    User.update({ _id: user._id }, { $set: { scores: scores }}, function (err, user) {
        if (err) console.log(err);
    });
};

gestionGainJeux.prototype.gestionResultat = function(req) {

    if(req.game.name == "boule"){
        gain =  calculGainBoule(req);
        enregistrerGain(gain,req.session.user);
    }else if(req.game.name == "tetris"){
        gain = calculGainTetris(req);
        enregistrerScore(score,req.session.user)
        enregistrerGain(gain,req.session.user);
    }else if (req.game.name == "breakout"){
        gain = calculGainBreakout(req);
        enregistrerGain(gain,req.session.user);
    }




};

calculGainBoule = function(req) {
//la gain a déja été calculé coté serveur dans boule.js
    return req.game.gain;
};

calculGainTetris = function(req) {
    gain = 0;
    if (req.game.score < 200 ){
        gain = 10;
    }else if (req.game.score < 500){
        gain = 100
    }else {
        gain = 1000;
    }
    return gain;
};
calculGainBreakout = function (req) {
    gain = 0;
    if (req.game.gameover == true && req.game.lives == 2){
        gain = 1000;
    }else {
        gain = 500;
    }
    return gain;
};
module.exports = gestionGainJeux;