
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
    first_trigger:null,
    second_trigger:null,
    thirdboss_trigger:null,
    boss_weapon1:null,
    boss1:null,
    boss2:null,
    boss3:null,
    triggerGroup:null,
    weapon:null,
    pointer:null,
    boss_trigger:null,
    follow_timer:null,
    spawned_boss:null,
    boss_weapon2:null,
    bosses_killed:null,
    mashup_text:null,
    camera_shaken:null,
    wizard1:null,
    wizard2:null,
    npc_group:null,
    challenge_accepted:false,
    changes_made:false,
    challenge_c:null,
    challenge_countdown:null,
    challenge_timer:null,
    seconds:0,
    minutes:0,
    mseconds:0,
    seconds_final:0,
    minutes_final:0,
    mseconds_final:0,
    showed_time:false,
    showed_popup:false,
    create:function(){
        fireRate = 100;
        nextFire =0 ;
        
    
        this.bosses_killed =0 ;
        this.map = game.add.tilemap('mash_new');
        this.map.addTilesetImage('magecity','tileset1');
        this.follow_timer = game.time.create(false);
        this.first_boss_shooting_timer = game.time.create(false);
        this.layer2=this.map.createLayer(0);
        this.layer2.resizeWorld();



        this.layer=this.map.createLayer(1);


        this.map.setCollision([1610612786,2684354610,168,121,122,129,130,141,142,143,144,149,150,151,152,29,1610612785,3221225522,3221225521,165,1610612788,50,51,115,114,2684354609,49,113,30],true,this.layer);
        game.physics.enable(this.layer,Phaser.Physics.ARCADE);
        this.layer.resizeWorld();

        this.npc_group = game.add.group();
        this.spawn_npcs();
        
        this.player = game.add.sprite(400,400,'king');
        game.physics.enable(this.player,Phaser.Physics.ARCADE);
        this.player.anchor.set(0.5,0.5);
        this.player.body.setSize(32,32,0,32);
        this.player.body.allowRotation=false;
        this.player.animations.add('leftMovement',[3,4,5],30,true);
        this.player.animations.add('rightMovement',[6,7,8],30,true);
        this.player.animations.add('upwardsMovement',[9,10,11],30,true);
        this.player.animations.add('downMovement',[9,10,11],30,true);
        this.player.HP = 20;
        

        this.triggerGroup = game.add.group();
        init_triggers();
        init_weapon();

        this.keyboard = game.input.keyboard.createCursorKeys();
        this.pointer = this.input.activePointer;
        this.game.camera.follow(this.player);
         this.map.createLayer(2);
        this.camera_shaken=false;

        
        this.mashup_text = game.add.text(32,32,'',{font:"20px Arial",fill:"#000000"});

        
        }, 
    spawn_npcs:function()
    {
        this.wizard1 = game.add.sprite(200,100,'wizard1',2);
        game.physics.enable(this.wizard1,Phaser.Physics.ARCADE);
        this.wizard1.anchor.set(0.5,0.5);
        this.wizard1.scale.setTo(1.2,1.2);
        this.wizard1.functionality = 'basic';
        this.wizard1.body.moves = false;
        this.wizard1.body.moves = false;

        this.wizard2 = game.add.sprite(300,100,'wizard2',2);
        game.physics.enable(this.wizard2,Phaser.Physics.ARCADE);
        this.wizard2.anchor.set(0.5,0.5);
        this.wizard2.scale.setTo(1.2,1.2);
        this.wizard2.functionality = 'challenge';
        this.wizard2.immovable = true;
        this.wizard2.body.moves = false;

        this.npc_group.add(this.wizard1);
        this.npc_group.add(this.wizard2);


    },
    update:function()
    {
        if(this.challenge_accepted == false )
        {
              game.physics.arcade.collide(this.player, this.layer,null,process_handler,this);
              game.physics.arcade.collide(this.player,this.npc_group,npc_func,process_handler,this);
              if(this.bosses_killed == 3)
              {

                    if(this.camera_shaken==false)
                    {

                        this.camera.shake(0.0020,2000);
                        this.camera_shaken=true;

                    }



              }

                if(this.pointer.isDown)
                {
                    this.weapon.fireAtPointer(this.input.activePointer);
                    Phaser.Math.angleBetween(this.input.activePointer.x,this.input.activePointer.y,this.player.x,this.player.y);
            
                }
            game.physics.arcade.overlap(this.player,this.triggerGroup,init_boss_callbeck,process_handler,this);
            game.physics.arcade.collide(this.weapon.bullets,this.layer,collide_bullets,process_handler,this);
          if(this.boss_trigger == true && this.spawned_boss.alive == true)
          {
                if(this.spawned_boss.bossNumber == 1 )
                {
                        game.physics.arcade.collide(this.player,this.boss_weapon1.bullets,kill_player,process_handler,this);
                        if(this.follow_timer.running==false){

                       
                        this.follow_timer.repeat(2000,10000,this.followRobot,this,this.spawned_boss,this.player,this.boss_weapon1);
                        this.follow_timer.start();
                        // star_fire(this.boss_weapon1);
                    }


                }
                if(this.spawned_boss.bossNumber ==3)
                {       
                        game.physics.arcade.collide(this.spawned_boss,this.layer);
                        game.physics.arcade.collide(this.spawned_boss,this.player,collide_player,process_handler,this);
                        if( this.follow_timer.running==false){

                     
                        this.follow_timer.repeat(2000,10000,this.followRobot,this,this.spawned_boss,this.player,this.boss_weapon2);
                        this.follow_timer.start();

                        }
                }
                if(this.spawned_boss.bossNumber ==2)
                {
                        game.physics.arcade.collide(this.spawned_boss,this.layer);
                        game.physics.arcade.collide(this.player,this.boss_weapon1.bullets,kill_player,process_handler,this);
                        if( this.follow_timer.running==false){

                        
                        this.follow_timer.repeat(2000,10000,this.followRobot,this,this.spawned_boss,this.player,this.boss_weapon1);
                        this.follow_timer.start();

                        }

                }
          }

                game.physics.arcade.overlap(this.spawned_boss,this.weapon.bullets,shoot_boss,process_handler,this);
             if(this.player.alive == true)
             {
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y=0;

                if(this.keyboard.left.isDown ){
                    
                    this.player.body.velocity.x -=100;
                    this.currentAnim = this.player.animations.play('leftMovement',10,false);
                }
                if(this.keyboard.right.isDown){
                    this.player.body.velocity.x +=100;
                    this.currentAnim = this.player.animations.play('rightMovement',10,false);
                }
                if(this.keyboard.up.isDown){
                   this.player.body.velocity.y -=100;
                    this.currentAnim = this.player.animations.play('upwardsMovement',10,false);
                }
                if(this.keyboard.down.isDown){
                    this.player.body.velocity.y +=100;
                    this.currentAnim = this.player.animations.play('downMovement',10,false);
                    
                }
             }
        }
        else
        {
            if(this.bosses_killed == 3)
            {
                this.mseconds_final = this.mseconds;
                this.seconds_final = this.seconds;
                this.minutes_final = this.minutes;
                this.showed_time = true;
        
            }
          
                    this.mseconds++;
                    if(this.mseconds==100)
                    {
                        this.seconds++;
                        this.mseconds = 0;
                        if(this.seconds==60)
                        {
                            this.minutes++;
                            this.seconds = 0;
                        }
                    }
                    if(this.showed_time == false)
                    {
                        this.mashup_text.destroy();
                        this.mashup_text = game.add.bitmapText(this.camera.x+50,this.camera.y+50,'font',this.minutes+' : '+this.seconds+' : '+this.mseconds,30);
                    }
                    else
                    {
                        if(this.showed_popup == false)
                        {
                            alert(this.minutes_final+" : "+this.seconds_final+" : "+this.seconds_final);
                            this.showed_popup = true;
                        }
                        if(this.mashup_text.alive == true)
                            this.mashup_text.kill();
                    }
                  
            
                    if(this.changes_made == false)
                    {
                        this.player.HP = 100;
                        this.changes_made = true;
                    }
                    game.physics.arcade.collide(this.player, this.layer,null,process_handler,this);
                    game.physics.arcade.collide(this.player,this.npc_group,npc_func,process_handler,this);
                    if(this.bosses_killed == 3)
                    {

                            if(this.camera_shaken==false)
                            {

                                this.camera.shake(0.0020,2000);
                                this.camera_shaken=true;

                            }

                        console.log("YOU WON THE GAME ");


                    }

                        if(this.pointer.isDown)
                        {
                            this.weapon.fireAtPointer(this.input.activePointer);
                            Phaser.Math.angleBetween(this.input.activePointer.x,this.input.activePointer.y,this.player.x,this.player.y);
                    
                        }
                        game.physics.arcade.overlap(this.player,this.triggerGroup,init_boss_callbeck,process_handler,this);
                        game.physics.arcade.collide(this.weapon.bullets,this.layer,collide_bullets,process_handler,this);
                    if(this.boss_trigger == true && this.spawned_boss.alive == true)
                    {
                            if(this.spawned_boss.bossNumber == 1 )
                            {
                                    game.physics.arcade.collide(this.player,this.boss_weapon1.bullets,kill_player,process_handler,this);
                                    if(this.follow_timer.running==false){

                                  
                                    this.follow_timer.repeat(2000,10000,this.followRobot,this,this.spawned_boss,this.player,this.boss_weapon1);
                                    this.follow_timer.start();
                         
                                }


                            }
                            if(this.spawned_boss.bossNumber ==3)
                            {       
                                    game.physics.arcade.collide(this.spawned_boss,this.layer);
                                    game.physics.arcade.collide(this.spawned_boss,this.player,collide_player,process_handler,this);
                                    if( this.follow_timer.running==false){

                                 
                                    this.follow_timer.repeat(2000,10000,this.followRobot,this,this.spawned_boss,this.player,this.boss_weapon2);
                                    this.follow_timer.start();
                       
                                    }
                            }
                            if(this.spawned_boss.bossNumber ==2)
                            {
                                    game.physics.arcade.collide(this.spawned_boss,this.layer);
                                    game.physics.arcade.collide(this.player,this.boss_weapon1.bullets,kill_player,process_handler,this);
                                    if( this.follow_timer.running==false){

                                 
                                    this.follow_timer.repeat(2000,10000,this.followRobot,this,this.spawned_boss,this.player,this.boss_weapon1);
                                    this.follow_timer.start();
                     
                                    }

                            }
                    }

                            game.physics.arcade.overlap(this.spawned_boss,this.weapon.bullets,shoot_boss,process_handler,this);
                        if(this.player.alive == true)
                        {
                            this.player.body.velocity.x = 0;
                            this.player.body.velocity.y=0;

                            if(this.keyboard.left.isDown ){
                                
                                this.player.body.velocity.x -=100;
                                this.currentAnim = this.player.animations.play('leftMovement',10,false);
                            }
                            if(this.keyboard.right.isDown){
                                this.player.body.velocity.x +=100;
                                this.currentAnim = this.player.animations.play('rightMovement',10,false);
                            }
                            if(this.keyboard.up.isDown){
                            this.player.body.velocity.y -=100;
                                this.currentAnim = this.player.animations.play('upwardsMovement',10,false);
                            }
                            if(this.keyboard.down.isDown){
                                this.player.body.velocity.y +=100;
                                this.currentAnim = this.player.animations.play('downMovement',10,false);
                                
                            }
                        }
            
        }
    },
    followRobot:function(boss,player,weapon)
    {

        if(boss.bossNumber == 1)
        {       
                boss.animations.play('float',10,true);
                star_fire(weapon);
                boss.body.velocity.x = 0;
                boss.body.velocity.y = 0;
                if (player.body.x > boss.body.x)
                {

                    boss.body.velocity.x = boss.body.velocity.x+50;
                }
                else
                {

                    boss.body.velocity.x = boss.body.velocity.x-50;
                }
                if (player.body.y > boss.body.y)
                {

                    boss.body.velocity.y = boss.body.velocity.y+50;
                }
                else
                {
                        boss.body.velocity.y = boss.body.velocity.y-50;

                }
        }
        if(boss.bossNumber == 2)
        {
                boss.body.velocity.x = 0;
                boss.body.velocity.y = 0;
                angle_variance_fire(boss,player,weapon);
                if (player.body.x > boss.body.x)
                {

                    boss.body.velocity.x = boss.body.velocity.x+50;
                }
                else
                {

                    boss.body.velocity.x = boss.body.velocity.x-50;
                }
                if (player.body.y > boss.body.y)
                {

                    boss.body.velocity.y = boss.body.velocity.y+50;
                }
                else
                {
                        boss.body.velocity.y = boss.body.velocity.y-50;

                }
        }
        if(boss.bossNumber == 3){
                
            boss.body.velocity.x = 0;
            boss.body.velocity.y = 0;
            
            if (player.body.x > boss.body.x)
            {

                boss.body.velocity.x = boss.body.velocity.x+200;
                
            }
            else
            {

                boss.body.velocity.x = boss.body.velocity.x-200;
            }
            
            if (player.body.y > boss.body.y)
            {

                boss.body.velocity.y = boss.body.velocity.y+200;
            }
            else
            {
                    boss.body.velocity.y = boss.body.velocity.y-200;

            }
        }
    }

}
  function init_triggers(){

        lobby_2.first_trigger = game.add.sprite(170,1100,null);
        game.physics.enable(lobby_2.first_trigger,Phaser.Physics.ARCADE);
        lobby_2.first_trigger.anchor.set(0.5,0.5);
        lobby_2.first_trigger.body.setSize(200,60,0,0);
        lobby_2.first_trigger.bossToSpawn = 1;

        
        lobby_2.second_trigger = game.add.sprite(868,900,null);
        game.physics.enable(lobby_2.second_trigger,Phaser.Physics.ARCADE);
        lobby_2.second_trigger.anchor.set(0.5,0.5);
        lobby_2.second_trigger.body.setSize(158,60,0,0);
        lobby_2.second_trigger.bossToSpawn = 2;

        lobby_2.third_trigger = game.add.sprite(868,160,null);
        game.physics.enable(lobby_2.third_trigger,Phaser.Physics.ARCADE);
        lobby_2.third_trigger.anchor.set(0.5,0.5);
        lobby_2.third_trigger.body.setSize(60,190,0,0);
        lobby_2.third_trigger.bossToSpawn = 3;

        lobby_2.triggerGroup.add(lobby_2.first_trigger);
        lobby_2.triggerGroup.add(lobby_2.second_trigger);
        lobby_2.triggerGroup.add(lobby_2.third_trigger);


    }

  function init_boss(number){

        if(number == 1 )
        {

            lobby_2.boss1 = game.add.sprite(300,1270,'boss1');
            lobby_2.boss1.anchor.set(0.5,0.5);
            lobby_2.boss1.scale.setTo(1,1);
            lobby_2.boss1.health = 15;
            lobby_2.boss1.bossNumber = 1;
            init_boss_weapon(lobby_2.boss1);
            game.physics.enable(lobby_2.boss1,Phaser.Physics.ARCADE);
            lobby_2.boss_trigger =true ;
            lobby_2.boss1.animations.add('float',[0,1,2],30,true);
             lobby_2.spawned_boss = lobby_2.boss1;


        
 


        }
        if(number ==2)
        {
            lobby_2.boss2 = game.add.sprite(1300,1270,'boss2');
            lobby_2.boss2.anchor.set(0.5,0.5);
            lobby_2.boss2.scale.setTo(1,1);
            lobby_2.boss2.health = 15;
            lobby_2.boss2.bossNumber = 2;           
            game.physics.enable(lobby_2.boss2,Phaser.Physics.ARCADE); 
            init_boss_weapon(lobby_2.boss2);         
            lobby_2.boss_trigger =true ;
            lobby_2.spawned_boss = lobby_2.boss2;
            


        }
        if(number ==3 )
        {
            lobby_2.boss3 = game.add.sprite(1270,300,'boss3');
            lobby_2.boss3.anchor.set(0.5,0.5);
            lobby_2.boss3.scale.setTo(1,1);
            lobby_2.boss3.health = 15;
            lobby_2.boss3.bossNumber = 3;
            
            game.physics.enable(lobby_2.boss3,Phaser.Physics.ARCADE);    
            init_boss_weapon(lobby_2.boss3);        
            lobby_2.boss_trigger =true ;
            lobby_2.spawned_boss = lobby_2.boss3;
            
 

        }
  }
  function init_boss_callbeck(player,trigger)
  {
      init_boss(trigger.bossToSpawn);
      trigger.destroy();
  }

  function init_weapon()
  {
      lobby_2.weapon = game.add.weapon(100,'bloodBullet');
        lobby_2.weapon.bulletKilltype = Phaser.Weapon.KILL_WORLD_BOUNDS;
        lobby_2.weapon.bulletSpeed= 300;
        lobby_2.weapon.fireRate = 200;

        lobby_2.weapon.addBulletAnimation('fire',[1,2,3,4,5,6],30,true);
        lobby_2.weapon.trackSprite(lobby_2.player);

        var bulletArray=lobby_2.weapon.bullets.children;
        
        for(bullet=0;bullet<bulletArray.length;bullet++){
            bulletArray[bullet].scale.setTo(0.2,0.2);
            bulletArray[bullet].body.updateBounds();
        }
  }

  function shoot_boss(boss,bullet,weapon)
  {
      if(boss.bossNumber == 1){
            bullet.kill();
            if(boss.health>1)
            {
                boss.health = boss.health -1 ;
                star_fire(lobby_2.boss_weapon1);
            }
            else
            {
                    lobby_2.boss_trigger = false;
                    lobby_2.follow_timer.stop();
                    // lobby_2.boss_weapon1.destroy();
                    boss.kill();
                    lobby_2.bosses_killed  = lobby_2.bosses_killed + 1;
                    
                    
            }
      }
      if(boss.bossNumber == 3){
            bullet.kill();
            if(boss.health>1)
            {
                boss.health = boss.health -1 ;
 
            }
            else
            {
                    lobby_2.boss_trigger = false;
                    lobby_2.follow_timer.stop();
   
                    boss.kill();
                    lobby_2.bosses_killed  = lobby_2.bosses_killed + 1;
                    
                    
            }
      }
        if(boss.bossNumber == 2){
        bullet.destroy();
        if(boss.health>1)
        {
            boss.health = boss.health -1 ;

        }
        else
        {
                lobby_2.boss_trigger = false;
                lobby_2.follow_timer.stop();
                lobby_2.boss_weapon1.destroy();
                boss.kill();
                lobby_2.bosses_killed  = lobby_2.bosses_killed + 1;
                
                
        }
      }
  }
  function init_boss_weapon(boss)
  {
        lobby_2.boss_weapon1 = game.add.weapon(50,'bloodBullet');
        lobby_2.boss_weapon1.bulletKilltype = Phaser.Weapon.KILL_WORLD_BOUNDS;
        lobby_2.boss_weapon1.bulletSpeed= 300;
        lobby_2.boss_weapon1.fireRate = 200;
        lobby_2.boss_weapon1.multiFire = true;
        lobby_2.boss_weapon1.addBulletAnimation('fire',[1,2,3,4,5,6],30,true);
        lobby_2.boss_weapon1.trackSprite(boss);
        // lobby_2.weapon.trackOffset.y = 16;
        // lobby_2.weapon.trackOffset.x = 32;
        var bulletArray=lobby_2.boss_weapon1.bullets.children;
        
        for(bullet=0;bullet<bulletArray.length;bullet++){
            bulletArray[bullet].scale.setTo(0.2,0.2);
            bulletArray[bullet].body.updateBounds();
        }
  }
  function star_fire(weapon)
  {
    var num = game.rnd.integerInRange(40,45);
    weapon.fireAngle += num;
    weapon.fire();
    weapon.fireAngle += num;
    weapon.fire();
    weapon.fireAngle += num;
    weapon.fire();
    weapon.fireAngle += num;
    weapon.fire();
    weapon.fireAngle += num;
    weapon.fire();
    weapon.fireAngle += num;
    weapon.fire();
    weapon.fireAngle += num;
    weapon.fire();
    weapon.fireAngle += num;
    weapon.fire();
    weapon.fireAngle += num;
    weapon.fire();  
  }
function kill_player(player,bullet)
{ 
    bullet.destroy();
    player.HP = player.HP-1;

    if(player.HP==0){
        player.kill();
        lobby_2.boss_trigger = false;
        lobby_2.challenge_accepted = false;
        lobby_2.seconds = 0;
        lobby_2.mseconds = 0;
        lobby_2.changes_made = false;
        game.state.start('lobby2');
    }
    // return player;

}
function angle_variance_fire(boss,player,weapon){
    weapon.bulletAngleVariance = 20;
    weapon.fireAtSprite(player);
    weapon.fireAtSprite(player);
}
function collide_bullets(bullet)
{
    bullet.kill();
}
function collide_player(boss,player)
{
     player.kill();
     lobby_2.boss_trigger = false;
     lobby_2.challenge_accepted = false;
     lobby_2.seconds = 0;
     lobby_2.mseconds = 0;
     lobby_2.changes_made = false;
     game.state.start('lobby2');
}
function process_handler(sprite)
{
    if(sprite.alive==true)
        return true;
    else
        return false;
}
function npc_func(player,group){
    group.body.velocity.x = 0;
    group.body.velocity.y = 0;
    if(group.functionality == 'basic')
    {
       
        console.log('MASHUP TEXT');
    }
    else
    {
        lobby_2.challenge_accepted = true;

        console.log('not mashup text');
    }

}