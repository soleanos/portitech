var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendmail = require('sendmail');

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


envoyerMail = function(adresse) {
    sendmail({
        from: 'no-reply@yourdomain.com',
        to: adresse,
        subject: 'caca',
        html: 'Mail of test sendmail ',
    }, function(err, reply) {
        console.log("coucou");
        console.log(err && err.stack);
        console.dir(reply);
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
        console.log("mdr")
        gain =  calculGainBoule(req);
        enregistrerGain(gain,req.body.idUser);
        envoyerMail('anthony85180@gmail.com');
    }else if(req.body.nomJeux="tetris"){
        gain = calculGainTetris(req);
        enregistrerGain(gain,req.body.idUser);
    }else if(req.body.nomJeux== "mahmutSport"){
		gain = calculGainMahmutsport(req);
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
calculGainMahmutsport = function(req) {
	gain=score ; // Valeure score
    return gain;
}
module.exports = gestionGainJeux;