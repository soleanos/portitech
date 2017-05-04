function Boule(){}

Boule.prototype.lancerPartie = function(game) {
    console.log("lancement de la partie ..");
    console.log("Le numéro choisie est :"+game.num);
    game = this.lancerBoule(game);
    console.log("Le numéro gagnant est : "+game.randomNum);
    game = this.verifierSiNumGagnant(game);

    if(game && game.results && game.results.num == "win"){
        console.log("Le joueur gagne de l'argent sur le numéro")
    }else{
        console.log("Le joueur perd de l'argent sur le numéro")
    }

    game = this.gererArgent(game);

    return game;
};


Boule.prototype.verifierSiNumGagnant = function(game) {
    game.results  = {};
    game.results.num = "loose";

    if(game.randomNum == game.num){
        game.results.num  = "win";
    }

    if(game.randomColor == game.color){
        game.results.color  = "win";
    }

    return game;
};

Boule.prototype.lancerBoule = function(game) {
    game.randomNum = Math.floor(Math.random() * 9) + 1;
    var randomColorIndex = Math.floor(Math.random() * 1)+1;
    game.randomColor = game.colors[randomColorIndex];
    return game;
};

Boule.prototype.gererArgent= function(game) {
    var gain = 0;
    if (game.results.num == "win"){
        gain = game.miseNum*7;
    }else{
        gain = -(game.miseNum);
    }

    var finalMoney = game.money+gain;
    if(finalMoney < 0){
        finalMoney=0
    }

    game.money = game.money+gain;

    return game;
};

module.exports = Boule;