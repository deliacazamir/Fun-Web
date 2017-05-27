var lobby_1={

    map:null,
    layer:null,
    layer2:null, 
    player:null,
    keyboard:null,

    currentAnim:null,
    bullets:null,
    bricks:null,
    fireRate:null,
    nextFire:null,

    create:function(){

        fireRate = 100;
        nextFire = 0;


        
    map = game.add.tilemap('firstlevel');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#313131';
    map.addTilesetImage('magecity', 'tileset1');
    map.addTilesetImage('town02','tileset2');
   //Create the first layer
   layer2=map.createLayer(0);
   layer2.resizeWorld();
   //Create the second layer and initialise collision
   layer = map.createLayer(1);

    map.setCollision([147,135,3221225605,955,986,3221226418,956,1001,1002,953,3221226427,1610613738,903,904,2684355561,1019,1020,1610613737,2684355562,1014,1015,961,2684355515,1022,1023,957,3221226417,945,1610613691,948,963],true,layer);
    game.physics.enable(layer,Phaser.Physics.ARCADE);
    layer.resizeWorld();
    //add the player to the layer and enable physics
    player = game.add.sprite(96,768,'king');
        game.physics.enable(player,Phaser.Physics.ARCADE);
     player.anchor.set(1,1);
     player.body.setSize(32,32,0,32);
    player.body.allowRotation=false;
    //add animations for the player
    player.animations.add('leftMovement',[3,4,5],30,true);
    player.animations.add('rightMovement',[6,7,8],30,true);
    player.animations.add('upwardsMovement',[9,10,11],30,true);
    player.animations.add('downMovement',[9,10,11],30,true);
    //crate cursor keys
    keyboard = game.input.keyboard.createCursorKeys();
    //create bullets group and enable collisions    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    game.camera.follow(player);
    map.createLayer(2);
    map.createLayer(3);
    },

    update:function(){
            
                game.debug.spriteInfo(player, 32, 32);
                // game.debug.cameraInfo(game.camera, 132, 332);
                // game.physics.arcade.collide(player,layer);
                console.log(game.physics.arcade.collide(player, layer));

                player.body.velocity.x = 0;
                player.body.velocity.y=0;
                
                // player.rotation=game.physics.arcade.angleToPointer(player);

                if(game.input.activePointer.isDown)
                {
                    this.fire();
                }



                if(keyboard.left.isDown ){
                    // player.body.moveLeft(50);
                    player.body.velocity.x -=100;
                    currentAnim = player.animations.play('leftMovement',10,true);
                }
                if(keyboard.right.isDown){
                    player.body.velocity.x +=100;
                    currentAnim = player.animations.play('rightMovement',10,false);
            

                }
                if(keyboard.up.isDown){
                    player.body.velocity.y -=100;
                    currentAnim = player.animations.play('upwardsMovement',10,true);
                }
                if(keyboard.down.isDown){
                    player.body.velocity.y +=100;
                    currentAnim = player.animations.play('downMovement',10,true);
                    
                }
    

    },

    fire:function(){
            
        if (game.time.now > nextFire && bullets.countDead() > 0)
        {
            nextFire = game.time.now + fireRate;

            var bullet = bullets.getFirstDead();

            bullet.reset(player.x - 8, player.y - 8);

            game.physics.arcade.moveToPointer(bullet, 300);
        }

    }

};