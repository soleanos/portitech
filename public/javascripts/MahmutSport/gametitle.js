var gameTitle = function(game){}

gameTitle.prototype = {
  	create: function(){
		var gameTitle = this.game.add.sprite(300,160,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(300,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
        var txt = this.game.add.text(300, 480, "A (c) WarTroll Corp 2017 Production",{ font: "16px Arial", fill: "#ffffff", align: "center" });
        txt.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TrollSport");
	}
}