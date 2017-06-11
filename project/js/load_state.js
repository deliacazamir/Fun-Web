var load_state={

    preload:function(){
    
    game.load.tilemap('firstlevel','assets/map.json',null,Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('mash_new','assets/mash_new.json',null,Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset1','assets/magecity.png');
    game.load.image('tileset2','assets/town02.png');
    game.load.spritesheet('king','assets/king.png',32,64,24);
    game.load.image('bullet', 'assets/purple_ball.png');
    game.load.spritesheet('bloodBullet','assets/blood_projectiles.png',153,153,6);
    game.load.spritesheet('boss1','assets/boss1.png',96,48,12);
    game.load.spritesheet('boss2','assets/boss2.png',70,70,12);
    // game.load.spritesheet('boss3','assets/boss3.png',80,80,12);
    game.load.spritesheet('boss3','assets/boss3.png',80,80,12)
    game.load.spritesheet('wizard1','assets/wizzard_1.png',40,49,5);
    game.load.spritesheet('wizard2','assets/wizard_2.png',32,48,12);
    game.load.bitmapFont('font','assets/game_text_0.png','assets/game_txt.xml');     
},

    create:function(){

        game.state.start('lobby1',lobby_1);
    }



};