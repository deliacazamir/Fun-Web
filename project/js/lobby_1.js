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
    objectLayer:null,
    http_point:null,
    mashu_up_point:null,
    weapon:null,
    pointer:null,
    bloodBullet:null,
    player2:null,

    create:function(){
        fireRate = 100;
        nextFire = 0;
        map = game.add.tilemap('firstlevel');

        game.stage.backgroundColor = '#313131';
        map.addTilesetImage('magecity', 'tileset1');
        map.addTilesetImage('town02','tileset2');
        //Create the first layer
        layer2=map.createLayer(0);
        layer2.resizeWorld();
        //Create the second layer and initialise collision
        layer = map.createLayer(1);
        http_point = game.add.sprite(270,175,null);
        game.physics.enable(http_point,Phaser.Physics.ARCADE);
        http_point.anchor.set(0.5,0.5);
        http_point.body.setSize(32,32,0,0);

        map.setCollision([2684355515,133,134,135,955,986,3221226418,956,1001,1002,953,3221226427,1610613738,903,904,2684355561,1019,1020,1610613737,2684355562,1014,1015,961,1022,1023,957,3221226417,945,1610613691,948,963],true,layer);
        game.physics.enable(layer,Phaser.Physics.ARCADE);
        layer.resizeWorld();
        //add the player to the layer and enable physics
        this.player = game.add.sprite(256,300,'king');
        this.player.anchor.set(0.5,0.5);
        game.physics.enable(this.player,Phaser.Physics.ARCADE);

        this.player.body.setSize(32,32,0,32);

        this.player.body.allowRotation=false;

        this.player.animations.add('leftMovement',[3,4,5],30,true);
        this.player.animations.add('rightMovement',[6,7,8],30,true);
        this.player.animations.add('upwardsMovement',[9,10,11],30,true);
        this.player.animations.add('downMovement',[9,10,11],30,true);

        keyboard = game.input.keyboard.createCursorKeys();


        this.pointer = this.input.activePointer;

        this.weapon = game.add.weapon(50,'bloodBullet');
        this.weapon.bulletKilltype = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.multiFire = true;
        this.weapon.bulletSpeed= 300;
        this.weapon.fireRate = 200;
        this.weapon.addBulletAnimation('fire',[1,2,3,4,5,6],30,true);

        this.weapon.trackedSprite = this.player;
        this.weapon.trackOffset.y = 16;
        this.weapon.trackOffset.x = 32;
        var bulletArray=this.weapon.bullets.children;
        for(bullet=0;bullet<bulletArray.length;bullet++){
            bulletArray[bullet].scale.setTo(0.2,0.2);
            bulletArray[bullet].body.updateBounds();

            
        }
        game.camera.follow(this.player);
        map.createLayer(2);
        map.createLayer(3);
    },


    update:function(){
        if(game.physics.arcade.overlap(this.player,http_point) == true){
            console.log(this.player.x+" -----"+this.player.y);
            game.state.start('lobby2');
        }


                console.log(game.physics.arcade.collide(this.player, layer));

                this.player.body.velocity.x = 0;
                this.player.body.velocity.y=0;
                if(this.pointer.isDown)
                {
                    this.weapon.fire(this.player,this.pointer.x,this.pointer.y);

                 
                }



                if(keyboard.left.isDown ){

                    this.player.body.velocity.x -=100;
                    currentAnim = this.player.animations.play('leftMovement',10,true);
                }
                if(keyboard.right.isDown){
                    this.player.body.velocity.x +=100;
                    currentAnim = this.player.animations.play('rightMovement',10,false);
            

                }
                if(keyboard.up.isDown){
                    this.player.body.velocity.y -=100;
                    currentAnim = this.player.animations.play('upwardsMovement',10,true);
                }
                if(keyboard.down.isDown){
                    this.player.body.velocity.y +=100;
                    currentAnim = this.player.animations.play('downMovement',10,true);
                    
                }
    

    },
    render:function() {

    }



};