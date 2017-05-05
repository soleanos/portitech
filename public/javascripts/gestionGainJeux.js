var mongoose = require('mongoose');
var User = mongoose.model('User');

function gestionGainJeux(){}

enregistrerGain = function(gain,userId) {
    User.findOne({_id: userId},function(err, user){
        var actualMoney = user.money;
        var finalmoney = actualMoney+gain;

        User.update({ _id: userId }, { $set: { money: finalmoney }}, function (err, user) {
            if (err) console.log(err);
        });
    });
};

//Score dois être un objet de la forme : {jeux:"Boule",score:200}
enregistrerScore = function(score,userId) {
    var scores = user.scores.push(score);

    // User.findOne({_id: userId},function(err, user){
    //     User.update({ _id: userId}, { $set: { scores: scores }}, function (err, user) {
    //         if (err) console.log(err);
    //     });
    // });

};

gestionGainJeux.prototype.gestionResultat = function(req) {

    console.log("Nom du jeux : " + req.body.nomJeux);
    console.log("Id de l'utilisateur : " +req.body.idUser);

    if(req.body.nomJeux == "boule"){
        gain =  calculGainBoule(req);
        enregistrerGain(gain,req.body.idUser);
    }else if(req.body.nomJeux="tetris"){
        gain = calculGainTetris(req);
        enregistrerGain(gain,req.body.idUser);
    }

};

calculGainBoule = function(req) {
    //la gain a déja été calculé coté serveur dans boule.js
  //mais on pourrai faire les calculs avec req.body.score par ex si je l'avais envoyé coté client..

    var gain = 10000 ; // Vlaure arbitraire
    return gain;
};

calculGainTetris = function(req) {
    gain = 0;
    if (req.body.score < 200 ){
        gain = 10;
    }else if (req.body.score < 500){
        gain = 100
    }else {
        gain = 1000;
    }
    return gain;
};
module.exports = gestionGainJeux;