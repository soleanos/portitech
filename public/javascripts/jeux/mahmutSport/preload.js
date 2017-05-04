var preload = function(game){}
 
preload.prototype = {
    preload: function(){ 
        var loadingBar = this.add.sprite(160,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
        this.game.load.image('sky', '../../../images/MahmutSport/sky.png');
        this.game.load.image('ground', '../../../images/MahmutSport/platform.png');
        this.game.load.image('star', '../../../images/MahmutSport/star.png');
        this.game.load.spritesheet('dude', '../../../images/MahmutSport/dude.png', 32, 48);
        this.game.load.image("gametitle","../../../images/MahmutSport/gametitle.png");
        this.game.load.image("play","../../../images/MahmutSport/play.png");
        this.game.load.image("gameover","../../../images/MahmutSport/gameover.png");
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}