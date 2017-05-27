var lobby_2={

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

    create:function(){
        fireRate = 100;
        nextFire =0 ;

        this.map = game.add.tilemap('mash');
        this.map.addTilesetImage('magecity','tileset1');
        this.map.addTilesetImage('town02','tileset2');

        this.layer2=this.map.createLayer(0);
        this.layer2.resizeWorld();

        this.layer=this.map.createLayer(1);
        
        this.map.setCollision([580,581,582,588,589,590,49,50,2684354609,596,597,598,1610612786,58,2684354610,605,685,686,687,688,693,694,695,696,1610612785,3221225522,3221225521,3221226197,3221226181,3221226180,3221226196,2684355269,3221226189,3221226173,3221226172,412,3221226188,1610613445,123,124,2684355268,2684355260,2684354997,3221225900,3221225909,1610613437,131,132,2684355261,437,702,703,704,1610613173,1610613436,1610613444,139,140,710,711,712,147,148,718,719,720,726,727,728,716,700,701,717,724,708,709,725,117,118,119,120,125,126,127,128,133,134,135,136,141,142,143,144,149,150,151,152,641,642,1610613768,1610613776,1610613784,1009,1010,1011,649,650,1610613767,1610613775,1610613783,1017,1018,1019,1020,1610613766,1610613774,1610613782,1025,1026,1027,1028,1029,1030,1031,1032,1610613765,1610613773,1610613781,1033,1034,1035,1036,1037,1038,1039,1040,1610613756,1610613764,1610613772,1610613780,1041,1042,1043,1044,1045,1046,1047,1048,1610613747,1610613755,1610613763,1610613771,1610613779,2684355601,2684355593,2684355585,2684355577,2684355569,1610613746,1610613754,1610613762,1610613770,1610613778,2684355602,2684355594,2684355586,2684355578,2684355570,1610613745,1610613753,1610613761,1610613769,1610613777,2684355603,2684355595,2684355587,2684355579,2684355571,3221226520,3221226519,3221226518,3221226517,3221226516,3221226515,3221226514,3221226513,2684355604,2684355596,2684355588,2684355580,3221226512,3221226511,3221226510,3221226509,3221226508,3221226507,3221226506,3221226505,2684355605,2684355597,2684355589,3221226504,3221226503,3221226502,3221226501,3221226500,3221226499,3221226498,3221226497,2684355606,2684355598,2684355590,3221226492,3221226491,3221226490,3221226489,2684355607,2684355599,2684355591,3221226483,3221226482,3221226481,2684355608,2684355600,2684355592],true,this.layer);
        game.physics.enable(this.layer,Phaser.Physics.ARCADE);
        this.layer.resizeWorld();

        this.player = game.add.sprite(300,300,'king');
        game.physics.enable(this.player,Phaser.Physics.ARCADE);
        this.player.anchor.set(0.5,0.5);
        this.player.body.setSize(32,32,0,32);
        this.player.body.allowRotation=false;
        this.player.animations.add('leftMovement',[3,4,5],30,true);
        this.player.animations.add('rightMovement',[6,7,8],30,true);
        this.player.animations.add('upwardsMovement',[9,10,11],30,true);
        this.player.animations.add('downMovement',[9,10,11],30,true);

        this.keyboard = game.input.keyboard.createCursorKeys();
    
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(50, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);


        this.game.camera.follow(this.player);
        this.map.createLayer(2);

        }, 

    update:function()
    {
              console.log(game.physics.arcade.collide(this.player, this.layer));

                this.player.body.velocity.x = 0;
                this.player.body.velocity.y=0;
                if(game.input.activePointer.isDown)
                {
                    this.fire();
                }
                if(this.keyboard.left.isDown ){
                    // player.body.moveLeft(50);
                    this.player.body.velocity.x -=100;
                    this.currentAnim = this.player.animations.play('leftMovement',10,true);
                }
                if(this.keyboard.right.isDown){
                    this.player.body.velocity.x +=100;
                    this.currentAnim = this.player.animations.play('rightMovement',10,false);
                }
                if(this.keyboard.up.isDown){
                   this.player.body.velocity.y -=100;
                    this.currentAnim = this.player.animations.play('upwardsMovement',10,true);
                }
                if(this.keyboard.down.isDown){
                    this.player.body.velocity.y +=100;
                    this.currentAnim = this.player.animations.play('downMovement',10,true);
                    
                }
    },

    fire:function(){
        if (game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = game.time.now + this.fireRate;

            var bullet = this.bullets.getFirstDead();
            if (bullet.body.x < game.camera.x){bullet.kill();}
            bullet.reset(this.player.x - 8, this.player.y - 8);

            game.physics.arcade.moveToPointer(bullet, 300);
        }

    }
}