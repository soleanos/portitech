var trollSport = function(game){
	shooted = false;
    touchground = false;
    way = false;
    counter = Math.round(Math.random() * (5 - 1) + 1);
	score = 0;
    ui = 0; 
    //platforms, items, player, cursors, star;
};

trollSport.prototype = {
  	create: function() {
		this.game.world.setBounds(0,0,80000, 600);
        this.game.time.events.loop(125, this.updateStrength, this);

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR ]);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.tileSprite(0, 0,80000,600,'sky');   

        platforms = this.game.add.group();
        items = this.game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(200,2);
        ground.body.immovable = true;

        this.createPlayer();
        cursors = this.game.input.keyboard.createCursorKeys();

        star = items.create(54, this.game.world.height - 150 ,'star');
        this.game.physics.arcade.enable(star);

        star.body.bounce.y = 0.44;
        star.body.gravity.y = 200;
		//star.body.damping = 1;
		
        star.body.collideWorldBounds = true;
        ui = this.game.add.text(this.game.camera.centerX/2, this.game.camera.centerY/2, 'Strenght: 0',  { font: "16px Arial", fill: "#ffffff", align: "center" });
        ui.anchor.setTo(0.5, 0.5);

	},//create
    update: function() {
        this.manageCursors();
		score = Math.round(star.body.x - 54);
        //  Collide the player and the stars with the platforms
        var hitPlatform = this.game.physics.arcade.collide(player, platforms);
        var h2 = this.game.physics.arcade.collide(items,platforms);
        if (this.spaceKey.isDown){
            //console.log('player: '+player.body.y+' '+player.body.x);
            //console.log('star: '+star.body.y+' '+star.body.x);
            if (checkShootable()){
                this.shoot();
            };
        }
        //console.log("vx "+star.body.velocity.x+" vy: "+star.body.velocity.y);
        if(star.body.y == 514) touchground = true;
        this.manageVel(star.body.velocity);
        this.checkVel();
    },//update
	render: function() {
        //if(!shooted)game.debug.text('angle: '+[player.body.y-star.body.y,player.body.x-star.body.x],100,100);
        //this.game.debug.cameraInfo(this.game.camera, 422, 32);
    },//render
    shoot : function() {
        var angle = [player.body.y-star.body.y, player.body.x-star.body.x];
        console.log("shoot! "+angle+" str: "+counter);
        star.body.velocity.y+=10*counter*(angle[0]);
        star.body.velocity.x+=10*counter*(-angle[1]);
        //console.log("vx "+star.body.velocity.x+" vy: "+star.body.velocity.y);
        this.game.camera.follow(star);
        shooted = true;
    }, //shoot
    updateStrength: function(){
        if (counter == 5) way = false;
        else if (counter == 0) way = true;
        (way) ? counter++ : counter--;
        ui.setText('Strength: ' + counter);
    },//updateStrength
    manageVel: function(o) {
        if ((touchground) && (o.y > 0)){
			star.body.damping = 0.9;
			star.body.velocity.x= (star.body.velocity.x)/1.1;
            console.log('ground slows down');
        }
    },//manageVel
    createPlayer: function(){
        player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
        this.game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    },//createPlayer
    manageCursors: function(){
        //  Reset the players velocity (movement)
            player.body.velocity.x = 0;


            if (cursors.left.isDown)
            {
                //  Move to the left
                player.body.velocity.x = -150;

                player.animations.play('left');
            }
            else if (cursors.right.isDown)
            {
                //  Move to the right
                player.body.velocity.x = 150;

                player.animations.play('right');
            }
            /*else if (cursors.x.isDown)
            {
                game.destroy();             
            }*/
            else
            {
                //  Stand still
                player.animations.stop();

                player.frame = 4;
            }

            //  Allow the player to jump if they are touching the ground.
            if (cursors.up.isDown && player.body.touching.down)
            {
                player.body.velocity.y = -350;
            }

    },//manageCursors
    checkVel: function(){
        var limit = 1;
        var fv = Math.sqrt(star.body.velocity.x * star.body.velocity.x + star.body.velocity.y * star.body.velocity.y);
        this.game.debug.text(fv, 100, 100);
        if ((touchground)&&(fv < 10)){
            score = star.body.x;
            this.game.state.start("GameOver",true,false,score);
        }
        
        if (touchground) this.game.state.start("GameOver",true,false,score);	
        
        /*
        First set your "limit" speed. When object velocity falls below you are sure object is slowing.

        Object's final velocity is composed from its x velocity and y velocity. Ratio and sign of these two gives direction and size in 2D space - velocity vector (velX, velY).

        To calculate vector size you have to do square root of velX * velX + velY * velY:    lenght =sqrt(velX * velX + velY * velY) ... in fact, it is Pythagorean theorem.

        If length is below your limit speed, then object slowed down below it. (length < limit)

        As calculating sqrt for every check is wasting of CPU you can power your limit speed by 2 and compare if:   length_squared < limit_powerded_by_2 ... velX * velX + velY * velY < limit_powered_by_2*/
    }

}

//******************************//
function checkShootable(){
             return ((!shooted) && (isNear(player.body.y, star.body.y))&&(isNear(player.body.x,star.body.x)));
}
function isNear(x1,x2){
	var r = x1-x2;
	return (r < 50);
}
